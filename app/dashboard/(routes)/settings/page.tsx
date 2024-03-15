// import prismadb from "@/lib/prismadb";
// import { auth } from "@clerk/nextjs";
// import { redirect } from "next/navigation";
// import { SettingsForm } from "./components/setting-form";
// interface SettingsPageProps {
//   //   params: {
//   //     storeId: string;
//   //   };
// }

// const SettingsPage: React.FC<SettingsPageProps> = async () => {

//   const user = await prismadb.user.findFirst({
//     where: {
//       userId,
//     },
//   });
//   if (!user) {
//     redirect("/dashboard");
//   }

//   return (
//     <div className="flex-col">
//       <div className="flex-1 space-y-4 p-8 pt-6">
//         <SettingsForm initialData={user} />
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;
