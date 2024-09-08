"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { permanentRedirect, } from "next/navigation";
import { toast } from "sonner";
import { LoginHandlerAuth } from "@/lib/action";

async function Handler(formdata: FormData) {
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;
  if (!email || !password) {
    return toast.error("Please fill all the fields");
  }

  const tostid = toast.loading('loading..')

  const res = await LoginHandlerAuth(email, password)
  // console.log(res);

  if (res?.error) {
    return toast.error(res.error, {
      id: tostid
    })
  } else {
    toast.success('Login successful', {
      id: tostid,
      duration: 2000
    })
    window.location.reload();
    return permanentRedirect('/')
  }
}

export default function LoginForm() {
  return (
    <form action={Handler}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label>Email</Label>
          <Input type="email" placeholder="Email" required name="email" />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Password</Label>
          <Input type="password" placeholder="Password" required name="password" />
        </div>
      </div>
      <div className="mt-2 w-full">
        <Button type="submit" className="w-full">Login</Button>
      </div>
    </form>
  )
}
