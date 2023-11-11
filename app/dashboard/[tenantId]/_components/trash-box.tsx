"use client";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Spinner } from "@/components/spinner";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useState } from "react";
import { deleteTodo } from "./todo_action";

export const TrashBox = ({
  id,
  tenantId,
}: {
  id: string;
  tenantId: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const params = useParams();
  const [loading, setLoding] = useState(false);
  const onRemove = async (id: string) => {
    setLoding(true);
    // await axios.delete("/api/task", { data: { id, tenantId } });
    await deleteTodo(tenantId, id);
    toast({
      title: "Task Deleted",
      description: "Task deleted",
      variant: "default",
    });
    setLoding(false);
    router.refresh();
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4">
        <Spinner size="lg" />
        <h1 className="text-xs">Deleting Todo</h1>
      </div>
    );
  }
  return (
    <>
      <ConfirmModal onConfirm={() => onRemove(id)}>
        <div
          role="button"
          className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
        >
          <Trash className="h-4 w-4 text-muted-foreground" />
        </div>
      </ConfirmModal>
    </>
  );
};
