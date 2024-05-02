import prismadb from "@/lib/prismadb";
import { StyleClient } from "./components/client";
import { StyleColumn } from "./components/columns";
import { format } from "date-fns";
const StylePage = async () => {
  const styles = await prismadb.style.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!styles) {
    return null;
  }

  const formattedStyle: StyleColumn[] = styles.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <StyleClient data={formattedStyle} />
      </div>
    </div>
  );
};

export default StylePage;
