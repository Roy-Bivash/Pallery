import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { NavLink } from "react-router";
import { toast } from "sonner";
import { DataChart } from "./DataChart";

  
const TEST_DATA = {
    name: "Bivash ROY",
    pseudo: "@bivash_roy",
    description: "User bio here : Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat assumenda odio fugit iusto dicta omnis reprehenderit ab laudantium ex! Et animi possimus quaerat nam corporis minima harum assumenda laborum nobis?"
}
export function Account(){
    

    function copy(value:string){
        // TODO
        toast("Copy successful", {
            description: "Your pseudo has been copied",
        })

    }

    return(
        <div className="container mx-auto p-4">
            <div id="top" className="flex gap-8">
                <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback>{TEST_DATA.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-lg font-bold">{TEST_DATA.name}</h3>
                    <p className="flex gap-2">
                        <span className="opacity-85">
                            {TEST_DATA.pseudo}
                        </span>
                        <Copy 
                            size={12} 
                            onClick={() => copy(TEST_DATA.pseudo)}
                            className="mt-1 opacity-80 hover:opacity-100 cursor-pointer" 
                        />
                    </p>
                </div>
            </div>
            <p className="mt-4 sm:w-2/3 opacity-90">{TEST_DATA.description}</p>

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
                        <Button variant="ghost" asChild>
                            <NavLink to="/account/plan">Upgrade</NavLink>
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
                        <Button variant="ghost" asChild>
                            <NavLink to="/account/billing">Add</NavLink>
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="flex flex-col lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Data</CardTitle>
                        <CardDescription>
                            <DataChart percentage={60} />
                            <p>
                                The Free plan gives you 1 Gb of storage
                                <br />
                                Used : 0.6 Gb
                            </p>
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="grow justify-end items-end">
                        <Button variant="ghost" asChild>
                            <NavLink to="/account/billing">Manage</NavLink>
                        </Button>
                    </CardFooter>
                </Card>
            </div>


        </div>
    )
}