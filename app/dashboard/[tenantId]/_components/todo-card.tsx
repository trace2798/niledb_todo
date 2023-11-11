import { Card, CardContent } from "@/components/ui/card";
import { Check, Trash } from "lucide-react";
import { FC } from "react";
import { TrashBox } from "./trash-box";
import { CheckBox } from "./check-box";

interface TodoCardProps {
  id: string;
  title: string;
  complete: boolean;
  tenantId: string;
}

const TodoCard: FC<TodoCardProps> = ({ tenantId, id, title, complete }) => {
  return (
    <>
      <Card
        key={id}
        className="p-3 text-center min-w-[350px] group-hover:text-indigo-400 max-w-md"
      >
        <CardContent className="p-0 flex justify-between items-center">
          <CheckBox id={id} tenantId={tenantId} complete={complete} />
          <h1>{title}</h1>
          <TrashBox id={id} tenantId={tenantId} />
        </CardContent>
      </Card>
    </>
  );
};

export default TodoCard;
