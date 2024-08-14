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
    return submission.reply();
  }

  try {
    // unique チェックが必要そう
    await db.insert(users).values({
      name: submission.value.name,
      email: submission.value.email,
    });
  } catch (error) {
    console.log(error);
    return submission.reply({
      fieldErrors: {
        email: ["あかんよ"],
      },
    });
  }

  revalidatePath("/users");

  return submission.reply({
    resetForm: true,
  });
}
