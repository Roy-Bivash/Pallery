import { useState } from "react"
import { LoginFormInput } from "@/@types/Login";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { redirect, useNavigate } from "react-router";

import { CustomFetch } from "@/lib/customFetch";
import { verifyTextInput } from "@/lib/form";
import { wait } from "@/lib/timer";
import { Loader } from "@/components/loader/Loader";

export function Login() {
    const [formInputs, setFormInputs] = useState<LoginFormInput>({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    let navigate = useNavigate();

    function updatLogineForm(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setFormInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function formSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setIsLoading(true);

        const { correct, message } = verifyTextInput(formInputs.email);
        if(!correct){
            // In case of an error make the user wait 2 sec
            await wait(2);
            setIsLoading(false);

            return toast("Error", {
                description: message
            })
        }

        const { response, error } = await CustomFetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email: formInputs.email, password: formInputs.password }),
        });

        if(error){
            setIsLoading(false);
            return toast("Error", {
                description: "Internal server error"
            })
        }

        if(response?.success){
            navigate('/');
        } else{
            await wait(2);
            setIsLoading(false);
            return toast("Error", {
                description: response.message
            })
        }
    }


    return (
        <>
            {isLoading && (
                <Loader />
            )}
            <main className="min-h-screen min-w-screen flex justify-center items-center">
                
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={formSubmit} className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    onChange={updatLogineForm} value={formInputs.email}
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    name="password" 
                                    type="password" 
                                    onChange={updatLogineForm} 
                                    value={formInputs.password} 
                                    required 
                                />
                            </div>
                            <Button type="submit" className="w-full">Login</Button>
                            <Button variant="outline" className="w-full">Sign In</Button>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </>
    )
}