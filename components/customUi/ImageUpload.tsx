"use client";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";

type uploadImageProps = {
  value: string[];
  onChange: (value: string) => void;

  onRemove: (value: string) => void;
};

export default function ImageUpload({
  onChange,
  value,
  onRemove,
}: uploadImageProps) {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <div className="">
      <div className=" mb-4 flex flex-wrap items-center gap-4">
        {value &&
          value.map((url, index) => (
            <div key={url} className="relative w-[200px] h-[200px]">
              <div className="absolute top-0 right-0 z-10">
                <Button
                  type="button"
                  variant={"destructive"}
                  onClick={() => onRemove(url)}
                  size="sm"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <Image
                src={url}
                alt="collection"
                className="object-cover rounded-lg"
                fill
              />
            </div>
          ))}
      </div>
      <CldUploadWidget uploadPreset="noscr4ee" onUpload={onUpload}>
        {({ open }) => {
          return (
            <Button type="button" variant={"secondary"} onClick={() => open()}>
              <Plus className=" h-4 w-4mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
