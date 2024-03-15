import prismadb from "@/lib/prismadb";
import ConfigurationForm from "./components/configuration-form";
const ConfigurationPage = async ({
  params,
}: {
  params: { configurationId: string };
}) => {
  const configuration = await prismadb.productConfiguration.findUnique({
    where: {
      id: params.configurationId,
    },
  });
  const productItems = await prismadb.productItem.findMany();
  const options = await prismadb.optionOfVariation.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8">
        <ConfigurationForm
          productItems={productItems}
          options={options}
          initialData={configuration}
        />
      </div>
    </div>
  );
};

export default ConfigurationPage;
