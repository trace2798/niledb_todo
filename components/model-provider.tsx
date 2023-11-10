"use client";

import { useEffect, useState } from "react";
import { TenantsModal } from "./modals/tenants-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* AddTenantModal */}
      {/* Add Todo Modal */}
      <TenantsModal />
    </>
  );
};
