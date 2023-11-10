import { FC } from "react";

const TenantIdPage = async ({ params }: { params: { tenantId: string } }) => {
  return (
    <>
      {params.tenantId}
    </>
  );
};

export default TenantIdPage;
