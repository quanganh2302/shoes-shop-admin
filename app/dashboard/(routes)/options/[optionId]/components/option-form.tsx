"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OptionOfVariation, Variation } from "@prisma/client";
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

interface OptionFormProps {
  initialData: OptionOfVariation | null;
  variations: Variation[];
}

const formSchema = z.object({
  value: z.string().min(1),
  variationId: z.string(),
});

type OptionFormValues = z.infer<typeof formSchema>;

const OptionForm: React.FC<OptionFormProps> = ({
  initialData,
  variations,
}) => {
  const title = initialData ? "Edit Option" : "Create Option";
  const description = initialData ? "Edit a Option" : "Add a new Option";
  const toastMessage = initialData ? "Option updated" : "Option created";
  const action = initialData ? "Save change" : "Create Option";
  const params = useParams();
  const router = useRouter();
  const form = useForm<OptionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      value: "",
      variationId: "",
    },
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: OptionFormValues) => {
    try {
      if (initialData) {
        await axios.patch(`/api/options/${params.optionId}`, data);
      } else {
        await axios.post(`/api/options`, data);
      }
      router.push(`/dashboard/options`);
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
      await axios.delete(`/api/options/${params.optionId}`);
      router.push(`/dashboard/options`);
      router.refresh();
      toast.success("Option deleted.");
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
              name="variationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variation</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required={true}
                  >
                    <FormControl>
                      <SelectTrigger className="hover:outline-none focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Select a Variation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {variations.map((variation) => (
                        <SelectItem key={variation.id} value={variation.id}>
                          {variation.name}
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
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Option value..."
                      {...field}
                    />
                  </FormControl>
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

export default OptionForm;
