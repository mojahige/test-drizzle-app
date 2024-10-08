"use server";

import { parseWithZod } from "@conform-to/zod";
import { createUserSchema } from "./schema";
import { db } from "@/db";
import { users } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createUser(_prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: createUserSchema,
  });

  if (submission.status !== "success") {
    const errors = Object.entries(submission.error ?? {}).reduce(
      (accumulator, [key, value]) =>
        value !== null ? { ...accumulator, [key]: value } : accumulator,
      {},
    );

    return submission.reply({
      fieldErrors: errors,
    });
  }

  try {
    await db.insert(users).values({
      name: submission.value.name,
      email: submission.value.email,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return submission.reply({
        formErrors: [error.message],
      });
    }
  }

  revalidatePath("/users");

  return submission.reply({
    resetForm: true,
  });
}
