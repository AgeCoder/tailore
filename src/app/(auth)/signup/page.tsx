import { auth, signIn } from "@/auth";
import SignupForm from "@/components/SignupForm/SignupForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";



export default async function Signup() {
    const session = await auth();
    if (session) {
        redirect('/')
    }
    return (
        <div className="mx-auto px-4 md:px-8 h-dvh flex items-center justify-center ">
            <Card className="w-80">
                <CardHeader>
                    <CardTitle className="flex items-center justify-center">
                        Sign Up
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <SignupForm />
                </CardContent>
                <CardFooter className="flex flex-col gap-4">

                    <Link href='/login'><p className="text-sm ">Already have account? <span className="text-blue-500">Login</span></p></Link>
                </CardFooter>
            </Card>
        </div>
    )
}
