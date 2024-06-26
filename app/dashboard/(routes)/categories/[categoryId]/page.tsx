import prismadb from "@/lib/prismadb";
import CategoryForm from "./components/category-form";
const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });
  const genders = await prismadb.gender.findMany();
  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8">
        <CategoryForm initialData={category} genders={genders} />
      </div>
    </div>
  );
};

export default CategoryPage;
