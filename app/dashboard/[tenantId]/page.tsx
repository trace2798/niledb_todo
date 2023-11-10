import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { ChevronLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

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
      <div className="mx-[5vw]">
        <Link href="/dashboard">
          <Button variant="ghost">
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
        </Link>
      </div>
      <div className="mx-[5vw] md:mx-[10vw]">
        <Heading title={tenant.name} />
      </div>
    </>
  );
};

export default TenantIdPage;
