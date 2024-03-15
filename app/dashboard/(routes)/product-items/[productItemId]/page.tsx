import prismadb from "@/lib/prismadb";
import ProductItemForm from "./components/product-item-form";
const ProductItemPage = async ({
  params,
}: {
  params: { productItemId: string };
}) => {
  const productItem = await prismadb.productItem.findUnique({
    where: {
      id: params.productItemId,
    },
    include: {
      images: true,
    },
  });
  const promotions = await prismadb.promotion.findMany();
  const products = await prismadb.product.findMany();
  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8">
        <ProductItemForm
          products={products}
          promotions={promotions}
          initialData={productItem}
        />
      </div>
    </div>
  );
};

export default ProductItemPage;
