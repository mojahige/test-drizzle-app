"use client";

import { ComponentPropsWithoutRef, PropsWithChildren, useId } from "react";
import { useFormState } from "react-dom";
import { createUser } from "./create-user";

function FormItem({ children }: PropsWithChildren) {
  return <div className="grid grid-rows-auto gap-y-1">{children}</div>;
}

function Input(props: ComponentPropsWithoutRef<"input">) {
  return <input className="text-black p-1" {...props} />;
}

export function Form() {
  const nameId = useId();
  const emailId = useId();
  const [_, dispatch] = useFormState(createUser, { name: "", email: "" });

  return (
    <form action={dispatch}>
      <div className="grid grid-rows-auto gap-y-6">
        <FormItem>
          <label htmlFor={nameId}>Name</label>
          <Input id={nameId} type="text" name="name" />
        </FormItem>

        <FormItem>
          <label htmlFor={emailId}>Email</label>
          <Input id={emailId} type="text" name="email" />
        </FormItem>

        <button type="submit" name="action">
          Submit
        </button>
      </div>
    </form>
  );
}
