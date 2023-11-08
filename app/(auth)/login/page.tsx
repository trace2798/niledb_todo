import { Card, CardHeader } from "@/components/ui/card";
import { FC } from "react";
import { UserAuthLoginForm } from "./_components/login-form";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <div className="flex w-full h-screen justify-center items-center">
        <Card className="min-w-sm max-w-md p-10">
          <CardHeader>Log in</CardHeader>
          <UserAuthLoginForm />
        </Card>
      </div>
    </>
  );
};

export default page;
