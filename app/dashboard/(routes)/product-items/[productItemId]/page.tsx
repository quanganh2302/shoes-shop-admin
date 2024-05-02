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
  });
  const products = await prismadb.product.findMany();
  const sizes = await prismadb.size.findMany();
  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8">
        <ProductItemForm
          sizes={sizes}
          initialData={productItem}
          products={products}
        />
      </div>
    </div>
  );
};

export default ProductItemPage;
