import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";
export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userStoreId: string };
}) {

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
