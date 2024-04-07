"use client";
import React from "react";
import { DataTable } from "../DataTable/DataTable";
import { columns } from "./Columns";
import { GetAllCollections } from "@/lib/actions/collections";
import { CollectionType } from "@/lib/models/Collection";

export default function AllCollectionsTable() {
  const [collections, setCollections] = React.useState([]);
  React.useEffect(() => {
    GetAllCollections()
      .then((res) => setCollections(res))
      .catch((err) => console.error(err));
  }, []);
  return <DataTable data={collections} columns={columns} />;
}
