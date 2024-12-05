import { useState } from "react"
import { LoginFormInput } from "@/@types/Login";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Login() {
    const [formInputs, setFormInputs] = useState<LoginFormInput>({ email: "", password: "" });

    function updatLogineForm(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setFormInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function formSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // TODO
    }


    return (
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
    )
}