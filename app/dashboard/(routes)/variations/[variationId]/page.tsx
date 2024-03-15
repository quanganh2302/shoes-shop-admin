import prismadb from "@/lib/prismadb";
import VariationForm from "./components/variation-form";
const VariationPage = async ({ params }: { params: { variationId: string } }) => {
  const variation = await prismadb.variation.findUnique({
    where: {
      id: params.variationId,
    },
  });
  const categories = await prismadb.category.findMany()
  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8">
        <VariationForm categories={categories} initialData={variation} />
      </div>
    </div>
  );
};

export default VariationPage;
