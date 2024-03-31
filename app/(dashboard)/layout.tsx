import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import LeftSideBar from "@/components/layout/LeftSideBar";
import { cn } from "@/lib/utils";
import TopBar from "@/components/layout/TopBar";
import { CustomToastContainer } from "@/components/layout/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brocelle - Admin Dashboard",
  description: "Admin dasboard to manage Brocelle's data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(inter.className, "flex flex-col lg:flex-row h-screen")}
        >
          <div className="flex max-lg:flex-col">
            <LeftSideBar />
            <TopBar />
          </div>
          <div className="flex flex-1 overflow-auto"> {children}</div>
          <CustomToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}
