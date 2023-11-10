import UserAccountNav from "@/components/user-account-nav";
import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FC } from "react";
import AddTenantButton from "./_components/AddTenantButton";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface pageProps {}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = "force-no-store";

const page: FC<pageProps> = async ({}) => {
  configureNile(cookies().get("authData"), null);
  console.log("showing tenants page for user: " + nile.userId);
  if (!nile.userId) {
    redirect("/");
  }
  let tenants: any = [];
  if (nile.userId) {
    // TODO: Replace with API call to get tenants for user when the SDK supports this
    tenants = await nile
      .db("tenants")
      .select("tenants.id", "tenants.name")
      .join("users.tenant_users", "tenants.id", "=", "tenant_users.tenant_id")
      .where("tenant_users.user_id", "=", nile.userId);
  }
  const userInfo = await nile.db("users.users").where("id", "=", nile.userId);
  console.log(userInfo);
  const email = userInfo[0].email;
  const picture = userInfo[0].picture;
  const name = userInfo[0].name;
  console.log(tenants);
  return (
    <>
      <div>
        <div className="mx-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl">TODO</h1>
          </div>
          <UserAccountNav email={email} name={name} imageUrl={picture} />
        </div>
        <div className="ml-[5vw] flex flex-col justify-center items-center">
          <Card className="max-w-sm p-3 flex items-center justify-center">
            <AddTenantButton />
          </Card>
          <Separator className="max-w-xl my-5" />
          <Label className="text-lg">Your Tenants</Label>
          {tenants.length === 0 && (
            <>
              <h1 className="mt-3">
                Do not have any tenants. Add one to get started
              </h1>
            </>
          )}
          {tenants.map((tenant: { id: string; name: string }) => (
            <Link
              href={`/dashboard/${tenant.id}`}
              className="group space-y-3 mt-3"
            >
              <Card
                key={tenant.id}
                className="p-5 text-center group-hover:text-indigo-400"
              >
                <h1>{tenant.name}</h1>
                <h1>{tenant.id}</h1>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
