import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type SheetHocProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
};
export function SheetDemo({ trigger, content }: SheetHocProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-10/12 overflow-auto p-0">
        {content}
      </SheetContent>
    </Sheet>
  );
}
