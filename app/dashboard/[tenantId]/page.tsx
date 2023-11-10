import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { ChevronLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { AddTask } from "./_components/add-task";

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
    </>
  );
};

export default TenantIdPage;
