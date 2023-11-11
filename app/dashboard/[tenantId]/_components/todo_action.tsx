"use server";

import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { cookies } from "next/headers";

export async function addTodo(tenantId: string, title: string) {
  configureNile(cookies().get("authData"), tenantId);
  console.log(
    "adding Todo " +
      title +
      " for tenant:" +
      nile.tenantId +
      " for user:" +
      nile.userId
  );
  try {
    // const id = uuid.v4();
    // need to set tenant ID because it is a required field
    await nile.db("todos").insert({
      tenant_id: nile.tenantId,
      title: title,
      complete: false,
    });
  } catch (e) {
    console.error(e);
    return { message: "Failed to add todo" };
  }
}

export async function deleteTodo(tenantId: string, id: string) {
  configureNile(cookies().get("authData"), tenantId);
  console.log(
    "deleting Todo " +
      id +
      " for tenant:" +
      nile.tenantId +
      " for user:" +
      nile.userId
  );
  try {
    // const id = uuid.v4();
    // need to set tenant ID because it is a required field
    await nile.db("todos").delete().where({ id: id });
  } catch (e) {
    console.error(e);
    return { message: "Failed to add todo" };
  }
}

export async function updateTodoStatus(
  tenantId: string,
  id: string,
  complete: boolean
) {
  configureNile(cookies().get("authData"), tenantId);
  console.log(
    "deleting Todo " +
      id +
      " for tenant:" +
      nile.tenantId +
      " for user:" +
      nile.userId
  );
  try {
    // const id = uuid.v4();
    // need to set tenant ID because it is a required field
    await nile
      .db("todos")
      .update({ complete: !complete }) // Use the complete variable
      .where({ id: id }); // Use the id variable
  } catch (e) {
    console.error(e);
    return { message: "Failed to add todo" };
  }
}

export async function updateTodoTitle(
  tenantId: string,
  id: string,
  title: string
) {
  configureNile(cookies().get("authData"), tenantId);
  console.log(
    "Updating Todo " +
      title +
      " for tenant:" +
      nile.tenantId +
      " for user:" +
      nile.userId
  );
  try {
    // const id = uuid.v4();
    // need to set tenant ID because it is a required field
    await nile
      .db("todos")
      .update({ title: title }) // Use the complete variable
      .where({ id: id }); // Use the id variable
  } catch (e) {
    console.error(e);
    return { message: "Failed to add todo" };
  }
}
