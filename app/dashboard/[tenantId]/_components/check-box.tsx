"use client";
import { Spinner } from "@/components/spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { updateTodoStatus } from "./todo_action";

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
    // await axios.patch("/api/task", { data: { id, tenantId, complete } });
    await updateTodoStatus(tenantId, id, complete);
    toast({
      title: "Task Status Updated",
      description: "Task updated",
      variant: "default",
    });
    setLoading(false);
    router.refresh();
  };

  return (
    <>
      <Checkbox checked={complete} onCheckedChange={() => handleClick(id)} />
    </>
  );
};
