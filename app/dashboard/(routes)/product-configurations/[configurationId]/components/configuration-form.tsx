"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  ProductConfiguration,
  ProductItem,
  OptionOfVariation,
} from "@prisma/client";
import { Trash } from "lucide-react";
import { AlertModal } from "@/components/modals/alert-modal";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
interface ConfigurationFormProps {
  initialData: ProductConfiguration | null;
  productItems: ProductItem[];
  options: OptionOfVariation[];
}

const formSchema = z.object({
  productItemId: z.string().min(1),
  optionId: z.string().min(1),
});

type ConfigurationFormValues = z.infer<typeof formSchema>;

const ConfigurationForm: React.FC<ConfigurationFormProps> = ({
  initialData,
  productItems,
  options,
}) => {
  const title = initialData ? "Edit Configuration" : "Create Configuration";
  const description = initialData
    ? "Edit a Configuration"
    : "Add a new Configuration";
  const toastMessage = initialData
    ? "Configuration updated"
    : "Configuration created";
  const action = initialData ? "Save change" : "Create Configuration";
  const params = useParams();
  const router = useRouter();
  const form = useForm<ConfigurationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      productItemId: "",
      optionId: "",
    },
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ConfigurationFormValues) => {
    try {
      if (initialData) {
        await axios.patch(
          `/api/product-configurations/${params.configurationId}`,
          data
        );
      } else {
        await axios.post(`/api/product-configurations`, data);
      }
      router.push(`/dashboard/product-configurations`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/product-configurations/${params.configurationId}`
      );
      router.push(`/dashboard/product-configurations`);
      router.refresh();
      toast.success("Product configuration deleted.");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator className="my-4" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="productItemId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Item</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required={true}
                  >
                    <FormControl>
                      <SelectTrigger className="hover:outline-none focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Select a Product Item" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {productItems.map((productItem) => (
                        <SelectItem key={productItem.id} value={productItem.id}>
                          {productItem.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="optionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Options</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required={true}
                  >
                    <FormControl>
                      <SelectTrigger className="hover:outline-none focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Select a Option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ConfigurationForm;
