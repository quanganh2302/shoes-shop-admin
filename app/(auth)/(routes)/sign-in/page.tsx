"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { EyeOff } from "lucide-react";
import { useState } from "react";

interface UserData {
  email: string;
  password: string;
}

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string(),
});
export default function SignInPage() {
  const [isShow, setIsShow] = useState(false);
  const [dataEmail, setDataEmail] = useState<UserData[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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
      console.log(respond);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const emailRight = dataEmail.find(({ email }) => email === values.email);
    if(emailRight) {
      if(emailRight?.password === values.password) {
        window.location.assign("/dashboard/users");
      } else {
        toast.error("Wrong password.");
      }
    } else {
      toast.error("Couldn't find your email");
    }
  };

  const onShow = () => {
    console.log("first");
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="flex items-center justify-center rounded-md border border-input ">
                  <FormControl>
                    <Input
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
          <Button className="w-full" type="submit">
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  );
}
