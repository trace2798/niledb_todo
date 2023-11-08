import { Button } from "@/components/ui/button";
import UserAccountNav from "@/components/user-account-nav";
import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FC } from "react";

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
  // const user = await nile.db("users").where(`id=${nile.userId}`);
  // console.log(user);
  return (
    <>
      <div>
        <a href="/api/logout">
          <Button>Logout</Button>
        </a>
        <UserAccountNav
          email="email"
          name="Name"
          imageUrl="https://avatars.githubusercontent.com/u/113078518?v=4"
        />
        {/* {userToken ? (
          // <AuthDataPanel token={userToken} />
          <h1>Hi</h1>
        ) : (
          <h1>No authentication data found in cookies.</h1>
        )} */}
        Page
      </div>
    </>
  );
};

export default page;
