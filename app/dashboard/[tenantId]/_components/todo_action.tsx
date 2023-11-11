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
