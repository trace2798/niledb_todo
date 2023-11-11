"use client";

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
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { buttonVariants } from "@/components/ui/button";
import { addTodo } from "./todo_action";

interface AddTaskProps extends React.HTMLAttributes<HTMLDivElement> {
  tenantId: string;
}

const formSchema = z.object({
  tenantId: z.string().min(2).max(50),
  title: z.string().min(2).max(50),
  complete: z.boolean(),
});

export function AddTask({ className, tenantId, ...props }: AddTaskProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tenantId: tenantId,
      title: "",
      complete: false,
    },
  });
  type FormData = z.infer<typeof formSchema>;

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      setLoading(true);
      console.log(values, "VALUES VALUES");
      // const response = await axios.post(`/api/task`, values);
      await addTodo(tenantId, values.title);
      form.reset();
      toast({
        title: "Task Created",
        description: "Successfully task created",
        variant: "default",
      });
      router.refresh();
      // router.push("/dashboard");
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
      <DialogTrigger className={buttonVariants({ variant: "outline" })}>
        Add Task
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">Add a Task</h2>
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
                          placeholder="Get this working"
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
                  Add Task
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
