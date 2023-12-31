"use client";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { updateTodoTitle } from "./todo_action";

interface EditTitleModalProps extends React.HTMLAttributes<HTMLDivElement> {
  tenantId: string;
  title: string;
  id: string;
}

const formSchema = z.object({
  tenantId: z.string().min(2).max(50),
  title: z.string().min(2).max(256),
  id: z.string().min(2).max(50),
});

export function EditTitleModal({
  className,
  tenantId,
  title,
  id,
  ...props
}: EditTitleModalProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tenantId: tenantId,
      title: title,
      id: id,
    },
  });
  type FormData = z.infer<typeof formSchema>;

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      setLoading(true);
      console.log(values, "VALUES VALUES");
      // const response = await axios.post(`/api/task`, values);
      //   await addTodo(tenantId, values.title);
      await updateTodoTitle(tenantId, values.id, values.title);
      form.reset();
      toast({
        title: "Task Updated",
        description: "Task successfully updated",
        variant: "default",
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };
  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog>
      <DialogTrigger className="hover:text-indigo-400 hover:cursor-pointer max-w-sm mx-5">
        {title}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">Edit Task</h2>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full grid-cols-12 gap-2 px-2 py-4 mt-5 border rounded-lg md:px-4 focus-within:shadow-sm"
          >
            <div className="grid gap-3">
              <div className="grid gap-1">
                <Label className="mb-3" htmlFor="task">
                  Task
                </Label>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="title"
                          placeholder={title}
                          type="text"
                          autoCorrect="off"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button disabled={isLoading} className="mt-5">
                  {isLoading && <Spinner />}
                  Edit Task
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
