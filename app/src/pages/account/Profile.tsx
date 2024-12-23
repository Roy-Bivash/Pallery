import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { X } from "lucide-react";

const TEST_DATA = {
    name: "Bivash ROY",
    pseudo: "@bivash_roy",
    description: "User bio here : Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat assumenda odio fugit iusto dicta omnis reprehenderit ab laudantium ex! Et animi possimus quaerat nam corporis minima harum assumenda laborum nobis?"
}

export function Profile(){
    const [profileForm, setProfileForm] = useState(TEST_DATA);

    function updateForm(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault();
        setProfileForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function saveFormChanges(){
        console.log(profileForm);
    }

    return(
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Edit you profile</h1>
            <div className="flex md:flex-row flex-col gap-8 md:items-center">
                <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback>{TEST_DATA.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Chnage your profile picture</Label>
                    <Input id="picture" type="file" />
                </div>
            </div>
            <div className="mt-8 flex md:flex-row flex-col gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="user_name">User Name</Label>
                    <Input 
                        type="text" 
                        id="user_name" 
                        placeholder="user name" 
                        value={profileForm.name} 
                        name="name"
                        onChange={updateForm}
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="user_name">Pseudo</Label>
                    <Input 
                        type="text" 
                        id="pseudo" 
                        placeholder="@pseudo" 
                        value={profileForm.pseudo} 
                        name="pseudo"
                        onChange={updateForm}
                    />
                </div>
            </div>
            <div className="grid w-full gap-1.5 mt-5">
                <Label htmlFor="description">Bio</Label>
                <Textarea 
                    className="md:max-w-[800px] min-h-28" 
                    placeholder="Type your message here." 
                    id="description" 
                    value={profileForm.description}
                    onChange={updateForm}
                    name="description"
                />
            </div>
            <div className="mt-5">
                <Label htmlFor="user_name">Profile Tags</Label>
                <div className="space-x-2 space-y-2">
                    <Badge variant="secondary">
                        Creative
                        <X size={15} />
                    </Badge>
                    <Badge variant="secondary">
                        Cartoon
                        <X size={15} />
                    </Badge>
                    <Badge variant="secondary">
                        Video Game
                        <X size={15} />
                    </Badge>
                    <Badge variant="secondary" className="hover:border-black cursor-pointer">Add</Badge>
                </div>
            </div>
            <div className="space-x-2 mt-8">
                <Button variant="outline" onClick={saveFormChanges}>Save Changes</Button>
                <Button variant="destructive">Cancel</Button>
            </div>
        </div>
    )
}