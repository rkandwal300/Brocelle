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

const createCollectionSchema = z.object({
  title: z.string().min(3).max(105),
  description: z.string().min(3).max(500),
  image: z.string(),
});

interface CollectionFormProps {
  initialData?: z.infer<typeof createCollectionSchema>;
}

export default function CollectionForm({ initialData }: CollectionFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof createCollectionSchema>>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          image: "",
        },
  });
  function onSubmit(values: z.infer<typeof createCollectionSchema>) {
    console.log(values);
  }
  return (
    <div className="p-10 flex flex-1 flex-col gap-4">
      <p className="text-xl font-semibold text-primary">Create Collection</p>
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
                    onRemove={(URL) => field.onChange("")}
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
