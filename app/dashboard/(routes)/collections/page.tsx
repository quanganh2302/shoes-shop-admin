import prismadb from "@/lib/prismadb";
import { CollectionClient } from "./components/client";
import { CollectionColumn } from "./components/columns";
import { format } from "date-fns";
const CollectionPage = async () => {
  const collections = await prismadb.collection.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!collections) {
    return null;
  }

  const formattedCollection: CollectionColumn[] = collections.map((item) =>({
    id: item.id,
    name: item.name,  
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))
  return (
    <div className="flex">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <CollectionClient data={formattedCollection}/>
      </div>
    </div>
  );
};

export default CollectionPage;
