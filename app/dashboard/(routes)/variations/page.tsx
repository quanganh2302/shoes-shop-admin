import prismadb from "@/lib/prismadb";
import { VariationClient } from "./components/client";
import { VariationColumn } from "./components/columns";
import { format } from "date-fns";
const VariationPage = async () => {
  const variations = await prismadb.variation.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!variations) {
    return null;
  }

  const formattedVariation: VariationColumn[] = variations.map((item) =>({
    id: item.id,
    name: item.name,  
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))
  return (
    <div className="flex">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <VariationClient data={formattedVariation}/>
      </div>
    </div>
  );
};

export default VariationPage;
