import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PasswordForm {
    current: string,
    new1: string,
    new2: string
}

export default function Security(){
    const [passwordForm, setPasswordForm] = useState<PasswordForm>({ current: "", new1: "", new2: "" });


    function updateFormValue(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setPasswordForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function resetPasswordSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        // TODO
        console.log(passwordForm);
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
                    <Button type="submit" variant="secondary">Change</Button>
                </div>
            </form>
        
            <Button className="mt-8" variant="outline" asChild>
                <Link to="/account">
                    Return
                </Link>
            </Button>
        </div>
    )
}