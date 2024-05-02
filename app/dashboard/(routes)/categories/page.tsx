import { CategoryClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { CategoryColumn } from "./components/columns";
const CategoriesPage = async () => {
  const categories = await prismadb.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!categories) {
    return null;
  }
  const formattedCategory: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    genderName: item.genderName,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategory} />
      </div>
    </div>
  );
};

export default CategoriesPage;
