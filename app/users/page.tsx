import { cache } from "react";
import { db } from "@/db";
import { Form } from "./_ui/form";

const getUsers = cache(async () => {
  return db.query.users.findMany();
});

export default async function Home() {
  const users = await getUsers();

  return (
    <main>
      <h1>Users</h1>
      {users.length ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p>ないよ</p>
      )}

      <section>
        <h2>Create user</h2>
        <Form />
      </section>
    </main>
  );
}
