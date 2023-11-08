import { UserAuthForm } from "@/components/auth-form";
import { Card } from "@/components/ui/card";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <div className="flex w-full h-screen justify-center items-center">
        <Card className="min-w-sm max-w-md p-10">
          <UserAuthForm />
        </Card>
      </div>
    </>
  );
};

export default page;
