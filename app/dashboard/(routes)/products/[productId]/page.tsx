import prismadb from "@/lib/prismadb";
import ProductForm from "./components/product-form";
const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
  });
  const categories = await prismadb.category.findMany()
  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8">
        <ProductForm categories={categories} initialData={product} />
      </div>
    </div>
  );
};

export default ProductPage;
