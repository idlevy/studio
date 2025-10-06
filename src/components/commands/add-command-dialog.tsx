"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { type Command } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  label: z.string().min(3, "Label must be at least 3 characters."),
  command: z.string().min(1, "Command cannot be empty."),
  category: z.string().min(1, "Category cannot be empty."),
  group: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddCommandDialogProps {
  children: React.ReactNode;
  onConfirm: (command: Omit<Command, "id"> | Command) => void;
  commandToEdit?: Command;
}

export function AddCommandDialog({ children, onConfirm, commandToEdit }: AddCommandDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: commandToEdit || {
      label: "",
      command: "",
      category: "",
      group: "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset(commandToEdit || {
        label: "",
        command: "",
        category: "",
        group: "",
      });
    }
  }, [open, commandToEdit, form]);

  const isEditing = !!commandToEdit;

  function onSubmit(values: FormValues) {
    if (isEditing) {
      onConfirm({ ...commandToEdit, ...values });
    } else {
      onConfirm(values);
       toast({
        title: "Success!",
        description: "Your command has been added.",
      });
    }
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Command" : "Add New Command"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the details of your command." : "Save a new command to your palette for quick access."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., List all pods" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="command"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Command</FormLabel>
                  <FormControl>
                    <Input placeholder="kubectl get pods -n production" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., kubectl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Pod Management" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">{isEditing ? "Save Changes" : "Save Command"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
