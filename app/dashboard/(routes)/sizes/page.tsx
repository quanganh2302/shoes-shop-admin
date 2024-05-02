import prismadb from "@/lib/prismadb";
import { SizeClient } from "./components/client";
import { SizeColumn } from "./components/columns";
import { format } from "date-fns";
const SizePage = async () => {
  const size = await prismadb.size.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!size) {
    return null;
  }

  const formattedSize: SizeColumn[] = size.map((item) =>({
    id: item.id,
    value: item.value,  
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))
  return (
    <div className="flex">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <SizeClient data={formattedSize}/>
      </div>
    </div>
  );
};

export default SizePage;
