import AllCollectionsTable from "@/components/Shared/collections/AllCollectionsTable";
import CollectionForm from "@/components/Shared/collections/CollectionForm";
import { SheetDemo } from "@/components/Shared/SheetHoc";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CollectionType } from "@/lib/models/Collection";
import { LucidePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Collections() {
  const initialValues: CollectionType = {
    title: "",
    image: "",
    description: "",
    products: [],
  };

  return (
    <div className="p-10 flex  flex-1 flex-col gap-4">
      <header className="flex justify-between items-center">
        <p className="text-xl font-semibold text-foreground/70"> Collections</p>

        <SheetDemo
          trigger={
            <Button className="flex gap-2">
              <LucidePlus size={16} /> Create Collection
            </Button>
          }
          content={<CollectionForm variant="create" />}
        />
      </header>
      <Separator orientation="horizontal" />
      <AllCollectionsTable />
    </div>
  );
}
