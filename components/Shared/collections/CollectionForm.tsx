"use client";
import React from "react";
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
import { Textarea } from "../../ui/textarea";
import ImageUpload from "../customUi/ImageUpload";
import { CollectionSchema } from "@/lib/validation/Collection";
import { toast } from "react-toastify";
import { LucideX } from "lucide-react";
import {
  createCollection,
  getCollection,
  updateCollection,
} from "@/lib/actions/collections";
import { SheetClose } from "@/components/ui/sheet";

interface CollectionFormProps {
  variant: "create" | "edit";
  id?: string;
}

export default function CollectionForm({ variant, id }: CollectionFormProps) {
  const sheetCloseRef = React.useRef<HTMLButtonElement | null>(null);
  const form = useForm<z.infer<typeof CollectionSchema>>({
    resolver: zodResolver(CollectionSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });
  const handleSubmit = async (values: z.infer<typeof CollectionSchema>) => {
    try {
      if (variant === "edit") {
        await updateCollection(id!, values);
      } else {
        await createCollection(values);
      }
      toast.success(
        `Collection ${variant ? "created" : "updated"} successfully`
      );
      if (sheetCloseRef?.current) {
        sheetCloseRef.current.click();
      }
    } catch (err) {
      toast.error(`Unable to ${variant} collection`);
    }
  };
  React.useEffect(() => {
    if (variant === "edit") {
      getCollection(`${id}`)
        .then((res) => {
          form.setValue("title", res.title);
          form.setValue("description", res.description);
          form.setValue("image", res.image);
        })
        .catch((err) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, id]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="px-6 flex  flex-1 flex-col gap-4"
      >
        <header className="py-3 sticky bg-background top-0 flex border-b justify-between items-center">
          <p className="text-lg font-semibold text-primary">
            {variant == "create" ? "Create" : "Update"} Collection
          </p>
          <div className="flex gap-4">
            <Button size="sm" type="submit">
              Submit
            </Button>
            <SheetClose
              className="p-2.5 border px-3 shadow-sm hover:bg-muted rounded-md"
              ref={sheetCloseRef}
            >
              <LucideX size={16} />
            </SheetClose>
          </div>
        </header>
        <div className="space-y-8">
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
        </div>
      </form>
    </Form>
  );
}
