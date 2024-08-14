"use client";

import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { createUser } from "./create-user";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { createUserSchema } from "./schema";

function FormItem({ children }: PropsWithChildren) {
  return <div className="grid grid-rows-auto gap-y-1">{children}</div>;
}

function Input(props: ComponentPropsWithoutRef<"input">) {
  return <input className="text-black p-1" {...props} />;
}

export function Form() {
  const [lastResult, action] = useFormState(createUser, undefined);
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    defaultValue: {
      name: "",
      email: "",
    },

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createUserSchema });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form action={action} {...getFormProps(form)}>
      <div className="grid grid-rows-auto gap-y-6">
        <FormItem>
          <label htmlFor={fields.name.id}>Name</label>
          <Input {...getInputProps(fields.name, { type: "text" })} />
          <div>{fields.name.errors}</div>
        </FormItem>

        <FormItem>
          <label htmlFor={fields.email.id}>Email</label>
          <Input {...getInputProps(fields.email, { type: "email" })} />
          <div>{fields.email.errors}</div>
        </FormItem>

        <button type="submit" name="action" disabled={!form.valid}>
          Submit
        </button>
      </div>
    </form>
  );
}
