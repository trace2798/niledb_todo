"use client";
import { Button } from "@/components/ui/button";
import { useTenants } from "@/hooks/use-tenants";
import { FC } from "react";

interface AddTenantButtonProps {}

const AddTenantButton: FC<AddTenantButtonProps> = ({}) => {
  const tenants = useTenants();
  return (
    <>
      <Button onClick={tenants.onOpen}>Add Tenant</Button>
    </>
  );
};

export default AddTenantButton;
