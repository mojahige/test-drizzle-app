"use client";

import { createUser } from "./create-user";
import { getFormProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { createUserSchema } from "./schema";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "react-aria-components";
import { z } from "zod";

export function CreateUserForm() {
  const [lastResult, action] = useFormState(createUser, undefined);
  const [form, fields] = useForm<z.infer<typeof createUserSchema>>({
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

    constraint: getZodConstraint(createUserSchema),

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <Form
      action={action}
      {...getFormProps(form)}
      validationErrors={form.allErrors}
    >
      <div className="grid grid-rows-auto gap-y-6">
        <TextField
          id={fields.name.id}
          name={fields.name.name}
          isRequired={fields.name.required}
          defaultValue={fields.name.initialValue}
          isInvalid={!fields.name.valid}
        >
          <Label>Name</Label>
          <Input type="text" />
          <FieldError>
            <ul>
              {fields.name.errors?.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </FieldError>
        </TextField>

        <TextField
          id={fields.email.id}
          name={fields.email.name}
          defaultValue={fields.email.initialValue}
          isRequired={fields.email.required}
          isInvalid={!fields.email.valid}
        >
          <Label>Email</Label>
          <Input type="email" />
          <FieldError />
          <FieldError>
            <ul>
              {fields.email.errors?.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </FieldError>
        </TextField>

        {form.errors && <div id={form.errorId}>{[...form.errors]}</div>}

        <Button type="submit" name="action" isDisabled={!form.valid}>
          Submit
        </Button>
      </div>
    </Form>
  );
}
