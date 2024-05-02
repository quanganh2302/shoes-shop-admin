import prismadb from "@/lib/prismadb";
import ProductCollectionForm from "./components/product-collection-form";
const ProductCollectionPage = async ({
  params,
}: {
  params: { productCollectionId: string };
}) => {
  const ProductCollection = await prismadb.productAndCollection.findUnique({
    where: {
      id: params.productCollectionId,
    },
  });
  const products = await prismadb.product.findMany();
  const collections = await prismadb.collection.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8">
        <ProductCollectionForm
          products={products}
          collections={collections}
          initialData={ProductCollection}
        />
      </div>
    </div>
  );
};

export default ProductCollectionPage;
