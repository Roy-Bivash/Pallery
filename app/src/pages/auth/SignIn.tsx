import { useState } from "react"
import { SignInFormInput } from "@/@types/SignIn";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router";

import { CustomFetch } from "@/lib/customFetch";
import { wait } from "@/lib/timer";
import { Loader } from "@/components/loader/Loader";

export function SignIn(){
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formInputs, setFormInputs] = useState<SignInFormInput>({ email: "", password1: "", password2: "", name: "" });
    const navigate = useNavigate();

    function updatLogineForm(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setFormInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    /**
     * Verify if the password has at least 8 characters and 1 number in it
     * @param string password 
     * @returns boolean
     */
    function verifyPassword(password:string) {
        const regex = /^(?=.*\d).{8,}$/;

        return (regex.test(password));
    }

    async function formSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        // Verify if the 2 password are matching :
        if(formInputs.password1 != formInputs.password2){
            setIsLoading(false);
            return toast("Error", {
                description: "The 2 passwords does not match"
            })
        }

        // Verify if the password meet all the requirements :
        if(!verifyPassword(formInputs.password1)){
            setIsLoading(false);
            return toast("Error", {
                description: "The password has to be at least 8 characters and include 1 number"
            })
        }

        // Verify the text fields :
        if(formInputs.email.trim() == "" || formInputs.name.trim() == ""){
            setIsLoading(false);
            return toast("Error", {
                description: "Please fill all the field"
            })
        }

        const { response, error } = await CustomFetch('/auth/signIn', {
            method: 'POST',
            body: JSON.stringify({
                email: formInputs.email,
                name: formInputs.name,
                password: formInputs.password1
            }),
        });
        if(error){
            wait(2); // Make the user wait artificialy when there is an error
            setIsLoading(false);
            return toast("Error", {
                description: "Internal server error"
            })
        }

        if(!response?.success){
            wait(2); // Make the user wait artificialy when there is an error
            setIsLoading(false);
            return toast("Error", {
                description: response.message
            })
        }

        if(response?.success){
            setIsLoading(false);
            return toast("Success", {
                description: "Your account has been created",
                action: {
                    label: "Login",
                    onClick: () => navigate('/login'),
                }
            })
        }
    }

    return(
        <>
            {isLoading && (
                <Loader />
            )}
            <main className="min-h-screen min-w-screen flex justify-center items-center">
                
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Sign In</CardTitle>
                        <CardDescription>
                            Welcome to Pallery, store your images here for easy access.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={formSubmit} className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    type="name"
                                    name="name"
                                    onChange={updatLogineForm} value={formInputs.name}
                                    placeholder="Michael Jackson"
                                    required
                                />
                            </div>
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
                                <Label htmlFor="password1">Password</Label>
                                <Input 
                                    name="password1" 
                                    type="password" 
                                    placeholder="***"
                                    onChange={updatLogineForm} 
                                    value={formInputs.password1} 
                                    required 
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password2">Confirme your password</Label>
                                <Input 
                                    name="password2" 
                                    type="password" 
                                    placeholder="***"
                                    onChange={updatLogineForm} 
                                    value={formInputs.password2} 
                                    required 
                                />
                            </div>
                            <Button type="submit" className="w-full">Sign In</Button>
                            <Button variant="outline" className="w-full" asChild>
                                <NavLink to='/login'>
                                    Already have an account ?
                                </NavLink>
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </>
    )
}