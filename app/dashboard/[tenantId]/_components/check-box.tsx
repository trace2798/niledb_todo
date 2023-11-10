"use client";
import { Spinner } from "@/components/spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export const CheckBox = ({
  id,
  tenantId,
  complete,
}: {
  id: string;
  tenantId: string;
  complete: boolean;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const handleClick = async (id: string) => {
    console.log("INSIDE");
    setLoading(true);
    console.log("CHANGE");
    await axios.patch("/api/task", { data: { id, tenantId, complete } });
    toast({
      title: "Task Status Updated",
      description: "Task updatedF",
      variant: "default",
    });
    setLoading(false);
    router.refresh();
  };

  //   if (loading) {
  //     return (
  //       <div className="h-full flex flex-col items-center justify-center p-4">
  //         <Spinner size="lg" />
  //         <h1 className="text-xs">Deleting Todo</h1>
  //       </div>
  //     );
  //   }
  return (
    <>
      <Checkbox onCheckedChange={() => handleClick(id)} />
    </>
  );
};
