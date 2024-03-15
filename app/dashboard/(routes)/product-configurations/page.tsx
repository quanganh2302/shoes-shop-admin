import prismadb from "@/lib/prismadb";
import { ConfigurationClient } from "./components/client";
import { ConfigurationColumn } from "./components/columns";
import { format } from "date-fns";
const ConfigurationPage = async () => {
  const configurations = await prismadb.productConfiguration.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!configurations) {
    return null;
  }

  const formattedConfiguration: ConfigurationColumn[] = configurations.map((item) =>({
    id: item.id,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))
  return (
    <div className="flex">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <ConfigurationClient data={formattedConfiguration}/>
      </div>
    </div>
  );
};

export default ConfigurationPage;
