import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { ChevronLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { AddTask } from "./_components/add-task";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = "force-no-store";

const TenantIdPage = async ({ params }: { params: { tenantId: string } }) => {
  configureNile(cookies().get("authData"), params.tenantId);

  console.log(
    "showing todos for user " + nile.userId + " for tenant " + nile.tenantId
  );
  const resp = await nile.api.tenants.getTenant();
  const tenant = await resp.json();
  console.log(tenant);
  const todos = await nile.db("todos").select("*").orderBy("task"); // no need for where clause because we previously set Nile context
  console.log(todos);
  return (
    <>
      <div>
        <Link href="/dashboard">
          <Button variant="ghost">
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
        </Link>
      </div>
      <div className="w-full flex w-fill items-center justify-between">
        <Heading title={tenant.name} />
        <AddTask tenantId={tenant.id} />
      </div>
      <div className="flex justify-center ">
        {todos.map((todo: { id: string; task: string; complete: boolean }) => (
          <Card
            key={todo.id}
            className="p-5 text-center min-w-[350px] group-hover:text-indigo-400 max-w-md"
          >
            <h1>{todo.task}</h1>
            <h1>{todo.complete ? <h1>Done</h1> : <h1>Not done</h1>}</h1>
          </Card>
        ))}
      </div>
    </>
  );
};

export default TenantIdPage;
