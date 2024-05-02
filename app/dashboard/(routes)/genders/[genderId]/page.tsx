import prismadb from "@/lib/prismadb";
import GenderForm from "./components/gender-form";
const GenderPage = async ({ params }: { params: { genderId: string } }) => {
  const gender = await prismadb.gender.findUnique({
    where: {
      id: params.genderId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8">
        <GenderForm  initialData={gender} />
      </div>
    </div>
  );
};

export default GenderPage;
