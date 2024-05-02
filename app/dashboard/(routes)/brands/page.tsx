import prismadb from "@/lib/prismadb";
import { BrandClient } from "./components/client";
import { BrandColumn } from "./components/columns";
import { format } from "date-fns";
const BrandPage = async () => {
  const brands = await prismadb.brand.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!brands) {
    return null;
  }

  const formattedBrand: BrandColumn[] = brands.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <BrandClient data={formattedBrand} />
      </div>
    </div>
  );
};

export default BrandPage;
