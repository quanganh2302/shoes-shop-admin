import prismadb from "@/lib/prismadb";
import ProductForm from "./components/product-form";
const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const products = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    // include: {
    //   images: true,
    // },
  });
  const promotions = await prismadb.promotion.findMany();
  const colors = await prismadb.color.findMany();
  const categories = await prismadb.category.findMany();
  const brands = await prismadb.brand.findMany();
  const styles = await prismadb.style.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8">
        <ProductForm
          brands={brands}
          styles={styles}
          colors={colors}
          promotions={promotions}
          initialData={products}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default ProductPage;
