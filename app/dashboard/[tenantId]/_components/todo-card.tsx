import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";

interface TodoCardProps {
  id: string;
  task: string;
  complete: boolean;
}

const TodoCard: FC<TodoCardProps> = ({ id, task, complete }) => {
  return (
    <>
      <Card
        key={id}
        className="p-3 text-center min-w-[350px] group-hover:text-indigo-400 max-w-md"
      >
        <CardContent className="p-0">
          <h1>{task}</h1>
        </CardContent>
      </Card>
    </>
  );
};

export default TodoCard;
