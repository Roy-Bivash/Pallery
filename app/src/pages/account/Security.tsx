import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { CustomFetch } from "@/lib/customFetch";

interface PasswordForm {
    current: string,
    new1: string,
    new2: string
}

export function Security(){
    const [passwordForm, setPasswordForm] = useState<PasswordForm>({ current: "", new1: "", new2: "" });
    const navigate = useNavigate();

    function updateFormValue(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setPasswordForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    /**
     * Verify if the password has at least 8 characters and 1 number in it
     * @param STRING password 
     * @returns boolean
     */
    function verifyPassword(password:string) {
        const regex = /^(?=.*\d).{8,}$/;

        return (regex.test(password));
    }

    async function resetPasswordSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        if(passwordForm.new1 != passwordForm.new2){
            return toast("Error", {
                description: "The 2 passwords does not match"
            })
        }
        if(!verifyPassword(passwordForm.new1)){
            return toast("Error", {
                description: "The password has to be at least 8 characters and include 1 number"
            })
        }
        
        const { response, error } = await CustomFetch('/user/password', {
            method: 'POST',
            body: JSON.stringify({
                oldPassword: passwordForm.current,
                newPassword: passwordForm.new1
            }),
        });
        if(error){
            return toast("Error", {
                description: "Internal server error"
            })
        }

        if(!response?.success){
            return toast("Error", {
                description: response.message
            })
        }

        // Password change is successfull
        navigate('/account');
    }

    return(
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Security</h1>
            
            <form onSubmit={resetPasswordSubmit}>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="current">Current password</Label>
                    <Input 
                        type="password" 
                        id="current" 
                        placeholder="Your current password here..." 
                        value={passwordForm.current} 
                        onChange={updateFormValue}
                        name="current"
                        required
                    />
                </div>
                <div className="mt-8 flex md:flex-row flex-col items-end gap-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="new1">New password</Label>
                        <Input 
                            type="password" 
                            id="new1" 
                            placeholder="Your new password here..." 
                            value={passwordForm.new1} 
                            onChange={updateFormValue}
                            name="new1"
                            required
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="new2">Confirm</Label>
                        <Input 
                            type="password" 
                            id="new2" 
                            placeholder="Confirm your new password here..." 
                            value={passwordForm.new2} 
                            onChange={updateFormValue}
                            name="new2"
                            required
                        />
                    </div>
                    <Button type="submit" variant="default">Change</Button>
                </div>
            </form>
        
            <Button className="mt-8" variant="secondary" asChild>
                <Link to="/account">
                    Return
                </Link>
            </Button>
        </div>
    )
}