import { cache } from "react";
import { db } from "@/db";

export const getUsers = cache(async () => {
  return db.query.users.findMany();
});

export default async function Home() {
  const users = await getUsers();

  return <main>{users.length ? <p>あるよ</p> : <p>ないよ</p>}</main>;
}
