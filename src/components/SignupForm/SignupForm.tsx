"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInAuth } from "@/lib/action";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { redirect } from "next/navigation";

async function Handler(formdata: FormData) {
  const res = await SignInAuth(formdata);
  if (res?.error) {
    toast.error(res.error);
  }
  if (res?.success) {
    toast.success(`${res.success} | Loging To Procced`);
    redirect('/login')
  }
}

export default function SignupForm() {
  return (
    <form action={Handler}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label>Name</Label>
          <Input type="text" placeholder="Name" required name="name" />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Email</Label>
          <Input type="email" placeholder="Email" required name="email" />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Password"
            required
            name="password"
          />
        </div>
      </div>
      <div className="mt-2 w-full">
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </div>
    </form>
  );
}
