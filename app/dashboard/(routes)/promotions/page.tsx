import prismadb from "@/lib/prismadb";
import { PromotionClient } from "./components/client";
import { PromotionColumn } from "./components/columns";
import { format } from "date-fns";
import { createNumberFormatter } from "@/lib/utils";

const PromotionPage = async () => {
  const promotions = await prismadb.promotion.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!promotions) {
    return null;
  }

  const formattedPromotion: PromotionColumn[] = promotions.map((item) =>({
    id: item.id,
    name: item.name,  
    discountRate: createNumberFormatter(4).format(item.discountRate.toNumber()) ,
    startDate: format(item.startDate, "MMMM do, yyyy"),
    endDate: format(item.endDate, "MMMM do, yyyy")

  }))
  return (
    <div className="flex">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <PromotionClient data={formattedPromotion}/>
      </div>
    </div>
  );
};

export default PromotionPage;
