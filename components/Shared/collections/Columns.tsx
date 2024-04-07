"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CollectionType } from "@/lib/models/Collection";
import { DeleteDailog } from "../DataTable/DeleteDailog";
import { DeleteCollection } from "@/lib/actions/collections";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { LucidePenLine } from "lucide-react";
import { SheetDemo } from "../SheetHoc";
import CollectionForm from "./CollectionForm";
import { CollectionSchema } from "@/lib/validation/Collection";
import { z } from "zod";

export const columns: ColumnDef<z.infer<typeof CollectionSchema>>[] = [
  {
    id: "#",
    accessorKey: "SerialNumber",
    header: () => "#",
    cell: ({ row }) => row.index + 1,
    size: 40,
  },
  {
    id: "title",
    accessorKey: "title",
    header: () => "Title",
    cell: ({ row }) => (
      <div className=" capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    id: "products",
    accessorKey: "products",
    header: () => "Products",
    cell: ({ row }) => (
      <div className="w-[80px]">{row.original?.products?.length ?? 0}</div>
    ),
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: () => "",
    cell: ({ row }) => {
      const handleDelete = async () => {
        try {
          const data = await DeleteCollection(row.original._id!);
          toast.success(`Collection ${data.title} deleted successfully `);
        } catch (error) {
          toast.error("Error in deleting collection");
        }
      };
      return (
        <div className="flex gap-2">
          <SheetDemo
            trigger={
              <Button
                variant="outline"
                className="border-primary text-primary hover:text-primary"
              >
                <LucidePenLine size={16} />
              </Button>
            }
            content={<CollectionForm variant="edit" id={row.original?._id} />}
          />
          <DeleteDailog handleDelete={handleDelete} />
        </div>
      );
    },
  },
];
