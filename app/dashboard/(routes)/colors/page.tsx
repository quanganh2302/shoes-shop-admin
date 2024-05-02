import prismadb from "@/lib/prismadb";
import { ColorClient } from "./components/client";
import { ColorColumn } from "./components/columns";
import { format } from "date-fns";
const ColorPage = async () => {
  const colors = await prismadb.color.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!colors) {
    return null;
  }

  const formattedColor: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <ColorClient data={formattedColor} />
      </div>
    </div>
  );
};

export default ColorPage;
