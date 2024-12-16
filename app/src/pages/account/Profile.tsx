import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const TEST_DATA = {
    name: "Bivash ROY",
    pseudo: "@bivash_roy",
    description: "User bio here : Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat assumenda odio fugit iusto dicta omnis reprehenderit ab laudantium ex! Et animi possimus quaerat nam corporis minima harum assumenda laborum nobis?"
}

export function Profile(){
    return(
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Edit you profile</h1>
        
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
                    </p>
                    <div className="space-x-2 space-y-2">
                        {/* <Badge variant="secondary">Creative</Badge>
                        <Badge variant="secondary">Cartoon</Badge>
                        <Badge variant="secondary">Video Game</Badge> */}
                    </div>
                </div>
            </div>
        </div>
    )
}