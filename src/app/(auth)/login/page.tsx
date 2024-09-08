import { auth, signIn } from "@/auth";
import LoginForm from "@/components/LoginForm/LoginForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GithubIcon, } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await auth();
    if (session) {
        return redirect('/')
    }
    return (
        <div className="mx-auto px-4 md:px-8 h-dvh flex items-center justify-center ">
            <Card className="w-80">
                <CardHeader>
                    <CardTitle className="flex items-center justify-center">
                        Login
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
            
                    <Link href='/signup'><p className="text-sm hover:text-blue-600">Don`t have account? <span className="text-blue-500">Signup</span></p></Link>
                </CardFooter>
            </Card>
        </div >
    )
}
