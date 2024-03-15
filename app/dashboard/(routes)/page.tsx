import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
}

const DashBoardPage: React.FC<DashboardPageProps> = async ({  }) => {
  // const user = await prismadb.user.findFirst({
  //   where: {
  //     id: params.storeId,
  //   },
  // });

  return <div>This is DashBoardPage</div>;
};

export default DashBoardPage;
