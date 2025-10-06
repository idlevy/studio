"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { type Link } from "@/lib/types";
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
  url: z.string().url("Please enter a valid URL."),
  category: z.string().min(1, "Category cannot be empty."),
  group: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddLinkDialogProps {
  children: React.ReactNode;
  onConfirm: (link: Omit<Link, "id"> | Link) => void;
  linkToEdit?: Link;
}

export function AddLinkDialog({ children, onConfirm, linkToEdit }: AddLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: linkToEdit || {
      label: "",
      url: "",
      category: "",
      group: "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset(linkToEdit || {
        label: "",
        url: "",
        category: "",
        group: "",
      });
    }
  }, [open, linkToEdit, form]);

  const isEditing = !!linkToEdit;

  function onSubmit(values: FormValues) {
    if (isEditing) {
      onConfirm({ ...linkToEdit, ...values });
    } else {
      onConfirm(values);
      toast({
        title: "Success!",
        description: "Your link has been added.",
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
          <DialogTitle>{isEditing ? "Edit Link" : "Add New Link"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the details of your link." : "Save a new URL to your palette for quick access."}
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
                    <Input placeholder="e.g., Next.js Docs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://nextjs.org" {...field} />
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
                    <Input placeholder="e.g., Documentation" {...field} />
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
                    <Input placeholder="e.g., Frameworks" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">{isEditing ? "Save Changes" : "Save Link"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
