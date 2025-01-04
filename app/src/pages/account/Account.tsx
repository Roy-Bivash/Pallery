import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { NavLink } from "react-router";
import { toast } from "sonner";
import { DataChart } from "./DataChart";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { UserType, TagType } from "@/@types/User";
import { getMe } from "@/lib/current";
import { CustomFetch } from "@/lib/customFetch";

const TEST_DATA = {
    name: "Bivash ROY",
    pseudo: "@bivash_roy",
    description: "User bio here : Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat assumenda odio fugit iusto dicta omnis reprehenderit ab laudantium ex! Et animi possimus quaerat nam corporis minima harum assumenda laborum nobis?"
}

export function Account(){
    const [userData, setUserData] = useState<UserType>({ id: 0, email: "", name: "", pseudo: "", bio: "", profile_picture: "" });
    const [img_count, setImg_count] = useState<number>(0);
    const [userTags, setUserTags] = useState<Array<TagType>>([]);

    useEffect(() => {
        async function getUserData(){
            const { success, user, img_count, tags } = await getMe();

            if(!success){
                return toast("Error", {
                    description: "Internal server error",
                })
            }
            if(user) {
                setUserData(user);
                setImg_count(img_count);
                setUserTags(tags);
            }
        }
        
        getUserData();
    }, []);

    function copy(value:string){
        navigator.clipboard.writeText(value);
        toast("Copy successful", {
            description: "Your pseudo has been copied",
        })
    }

    function functionnnalityNotImplemented(){
        alert("Maybe in a later version")
    }

    return(
        <div className="container mx-auto p-4">
            <div id="top" className="flex gap-8">
                <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback>{userData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-lg font-bold">{userData.name}</h3>
                    <p className="flex gap-2">
                        <span className="opacity-85">
                            {userData.pseudo}
                        </span>
                        <Copy 
                            size={12} 
                            onClick={() => copy(userData.pseudo)}
                            className="mt-1 opacity-80 hover:opacity-100 cursor-pointer" 
                        />
                    </p>
                    <div className="space-x-2 space-y-2">
                        {userTags.map(el => (
                            <Badge variant="secondary" key={el.tag_id}>{el.name}</Badge>
                        ))}
                    </div>
                </div>
            </div>
            <p className="mt-8 sm:mt-4 sm:w-2/3 opacity-90">{userData.bio}</p>

            <div className="grid grid-cols-1 mt-12 mb-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>
                            Bio, user name, profile picture, pseudo...
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="grow justify-end items-end">
                        <Button variant="ghost" asChild>
                            <NavLink to="/account/profile">Manage</NavLink>
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                        <CardDescription>
                            Authentification : password, two factor authentication...
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="grow justify-end items-end">
                        <Button variant="ghost" asChild>
                            <NavLink to="/account/security">Manage</NavLink>
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Plan</CardTitle>
                        <CardDescription>
                            You are currently using the <span className="underline">Free</span> plan
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="grow justify-end items-end">
                        <Button variant="ghost" onClick={() => functionnnalityNotImplemented()}>
                            Upgrade
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Billing</CardTitle>
                        <CardDescription>
                            You have no billing plan
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="grow justify-end items-end">
                        <Button variant="ghost" onClick={() => functionnnalityNotImplemented()}>
                            Add
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="flex flex-col lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Data</CardTitle>
                        <CardDescription>
                            <DataChart percentage={img_count} />
                            <p>
                                The Free plan gives you 100 images of storage
                                <br />
                                Used : {img_count} images
                            </p>
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="grow justify-end items-end">
                        <Button variant="ghost" onClick={() => functionnnalityNotImplemented()}>
                            Manage
                        </Button>
                    </CardFooter>
                </Card>
            </div>


        </div>
    )
}