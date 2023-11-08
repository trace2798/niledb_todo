import { cookies } from "next/headers";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const userToken = cookies().get("token")?.value;
  return (
    <>
      <div>
        {userToken ? (
          // <AuthDataPanel token={userToken} />
          <h1>Dashboard page</h1>
        ) : (
          <h1>No authentication data found in cookies.</h1>
        )}
      </div>
    </>
  );
};

export default page;
