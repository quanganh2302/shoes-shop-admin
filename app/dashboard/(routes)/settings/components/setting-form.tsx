// "use client";

// import { useState } from "react";
// import { User } from "@prisma/client";
// import { z } from "zod";
// import { Heading } from "@/components/ui/heading";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Trash } from "lucide-react";
// interface SettingsPageProps {
//   initialData: User;
// }

// const formSchema = z.object({
//   name: z.string().min(1),
// });

// type SettingsFormValues = z.infer<typeof formSchema>;

// export const SettingsForm: React.FC<SettingsPageProps> = ({ initialData }) => {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const form = useForm<SettingsFormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: initialData,
//   });

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values);
//   }
//   return (
//     <div>
//       <div className="flex items-center justify-between">
//         <Heading
//           title="Setting"
//           description="Manage store preferences"
//         ></Heading>
//         <Button
//           disabled={loading}
//           variant="destructive"
//           size="sm"
//           onClick={() => {
//             setOpen(true);
//           }}
//         >
//           <Trash className="h-4 w-4" />
//         </Button>
//       </div>
//       <Separator />
//     </div>
//   );
// };
