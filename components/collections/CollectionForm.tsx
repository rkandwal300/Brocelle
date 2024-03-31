"use client";
import React from "react";
import { Separator } from "../ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../customUi/ImageUpload";
import { useRouter } from "next/navigation";
import { CollectionSchema } from "@/lib/validation/Collection";
import { toast } from "react-toastify";
import { LucideX } from "lucide-react";

interface CollectionFormProps {
  initialData?: z.infer<typeof CollectionSchema>;
}

export default function CollectionForm({ initialData }: CollectionFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof CollectionSchema>>({
    resolver: zodResolver(CollectionSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          image: "",
        },
  });
  async function onSubmit(values: z.infer<typeof CollectionSchema>) {
    try {
      const res = await fetch("/api/collections", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        throw new Error("unable to create data");
      }
      toast.success("Data submitted successfully");
      router.push("/collections");
    } catch (error) {
      console.log("[Collection_POST in CreateCollection]", error);
      toast.error("unable to create data please try again later");
    }
  }
  return (
    <div className="p-10 flex  flex-1 flex-col gap-4">
      <header className="flex justify-between items-center">
        <p className="text-xl font-semibold text-primary">Create Collection</p>

        <Button variant="outline" onClick={() => router.back()}>
          <LucideX size={16} />
        </Button>
      </header>
      <Separator orientation="horizontal" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={5} placeholder="Description" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={(url) => field.onChange("")}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-10">
            <Button type="submit">Submit</Button>
            <Button type="button" onClick={() => router.push("/collections")}>
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
