import prismadb from "@/lib/prismadb";
import { GenderClient } from "./components/client";
import { GenderColumn } from "./components/columns";
import { format } from "date-fns";
const GenderPage = async () => {
  const genders = await prismadb.gender.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!genders) {
    return null;
  }

  const formattedgender: GenderColumn[] = genders.map((item) =>({
    id: item.id,
    name: item.name,  
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))
  return (
    <div className="flex">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <GenderClient data={formattedgender}/>
      </div>
    </div>
  );
};

export default GenderPage;
