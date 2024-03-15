import prismadb from "@/lib/prismadb";
import PromotionForm from "./components/promotion-form";
const PromotionPage = async ({ params }: { params: { promotionId: string } }) => {
  const promotion = await prismadb.promotion.findUnique({
    where: {
      id: params.promotionId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8">
        <PromotionForm initialData={promotion} />
      </div>
    </div>
  );
};

export default PromotionPage;
