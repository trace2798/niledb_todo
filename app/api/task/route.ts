import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Note that this route must exist in this exact location for user/password signup to work
// Nile's SignUp component posts to this route, we call Nile's signup API via the SDK
export async function POST(req: Request) {
  try {
    const body = await req.json();
    configureNile(cookies().get("authData"), null);
    if (!nile.userId) {
      return new NextResponse("Unauthorized");
    }
    console.log(body);

    await nile.db("todos").insert({
      tenant_id: body.tenantId,
      task: body.title,
      complete: body.complete,
    });
    // const createTenantResponse = await nile.api.tenants.createTenant({
    //   name: body.name,
    // });
    // const tenant = await createTenantResponse.json();
    // const tenantID = tenant.id;
    // console.log("created tenant with tenantID: ", tenantID);
    return new NextResponse("Task Created", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const data = await req.json();
    const tenantId = data.tenantId;
    configureNile(cookies().get("authData"), tenantId);
    await nile.db("todos").delete().where({ id: data.id });
    return new NextResponse("Successfully Deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const data = await req.json();
    console.log(data);
    const { id, tenantId, complete } = data.data; // Access nested data
    configureNile(cookies().get("authData"), tenantId);
    console.log("@");
    await nile
      .db("todos")
      .update({ complete: !complete }) // Use the complete variable
      .where({ id: id }); // Use the id variable
    return new NextResponse("Successfully Updated", { status: 200 }); // Change message to "Successfully Updated"
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
