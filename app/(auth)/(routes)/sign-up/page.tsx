"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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

import { EyeOff } from "lucide-react";

import { phoneRegex } from "@/lib/constants";

const formSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Number!"),
  role: z.string(),
});

interface UserData {
  email: string;
}

export default function SignUpPage() {
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataEmail, setDataEmail] = useState<UserData[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    fetchDataUser();
  }, []);

  const fetchDataUser = async () => {
    try {
      const respond = await axios.get("/api/users");
      if (respond.status === 200) {
        const userData = await respond.data;
        setDataEmail(userData);
      } else {
        toast.error("Can't fetch data user.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const emailExisted = dataEmail.findIndex(
        ({ email }) => email === values.email
      );
      if (emailExisted != -1) {
        toast.error("Email existed");
      } else {
        await axios.post("/api/users", values);
        window.location.assign("/dashboard/users");
      }
      // redirect("/dashboard"); In Server Actions and Route Handlers, redirect should be called after the try/catch block.
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onShow = () => {
    setIsShow(!isShow);
  };

  return (
    <div className=" border p-4 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    className="hover:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    type="email"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    className="hover:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    type="tel"
                    placeholder="Phone Number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Exam: 0123456780</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required={true}
                >
                  <FormControl>
                    <SelectTrigger className="hover:outline-none focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Select a Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="R1">Admin</SelectItem>
                    <SelectItem value="R2">User</SelectItem>
                    <SelectItem value="R3">Client</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="flex items-center justify-center rounded-md border border-input ">
                  <FormControl>
                    <Input
                      disabled={loading}
                      className="border-none grow hover:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      type={isShow ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <EyeOff
                    onClick={() => onShow()}
                    className="w-[10%] mr-1 hover:cursor-pointer"
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="w-full" type="submit">
            Sign up
          </Button>
        </form>
      </Form>
    </div>
  );
}
