"use server";

import { InsertUser } from "@/db/schema";

type State = Pick<InsertUser, "name" | "email">;

export async function createUser(state: State, formDate: FormData) {
  const name = formDate.get("name")?.toString();
  const email = formDate.get("email")?.toString();

  switch (true) {
    case !!name && !!email:
      return {
        name,
        email,
      };
    case !!name:
      return {
        ...state,
        name,
      };
    case !!email:
      return {
        ...state,
        email,
      };
    default:
      return state;
  }
}
