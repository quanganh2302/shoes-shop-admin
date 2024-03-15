import prismadb from "@/lib/prismadb";
import OptionForm from "./components/option-form";
const OptionPage = async ({ params }: { params: { optionId: string } }) => {
  const option = await prismadb.optionOfVariation.findUnique({
    where: {
      id: params.optionId,
    },
  });
  const variations = await prismadb.variation.findMany();
  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8">
        <OptionForm variations={variations} initialData={option} />
      </div>
    </div>
  );
};

export default OptionPage;
