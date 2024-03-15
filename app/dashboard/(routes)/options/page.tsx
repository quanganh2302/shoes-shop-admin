import prismadb from "@/lib/prismadb";
import { OptionClient } from "./components/client";
import { OptionColumn } from "./components/columns";
import { format } from "date-fns";
const OptionPage = async () => {
  const options = await prismadb.optionOfVariation.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!options) {
    return null;
  }

  const formattedOption: OptionColumn[] = options.map((item) =>({
    id: item.id,
    value: item.value,  
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))
  return (
    <div className="flex">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <OptionClient data={formattedOption}/>
      </div>
    </div>
  );
};

export default OptionPage;
