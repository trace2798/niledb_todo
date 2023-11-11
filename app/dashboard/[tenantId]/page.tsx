import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { ChevronLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { AddTask } from "./_components/add-task";
import { Card } from "@/components/ui/card";
import TodoCard from "./_components/todo-card";

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
  const todos = await nile.db("todos").select("*").orderBy("created_at"); // no need for where clause because we previously set Nile context
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
      <div className="w-full flex flex-col md:flex-row w-fill items-center justify-between mb-3 md:mb-0">
        <Heading title={tenant.name} />
        <AddTask tenantId={tenant.id} />
      </div>
      <div className="flex flex-col justify-center items-center space-y-3 mb-24 overflow-hidden">
        {todos.map((todo: { id: string; title: string; complete: boolean }) => (
          <TodoCard
            key={todo.id}
            tenantId={params.tenantId}
            complete={todo.complete}
            id={todo.id}
            title={todo.title}
          />
        ))}
      </div>
    </>
  );
};

export default TenantIdPage;
