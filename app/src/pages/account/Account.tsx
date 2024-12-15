import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const TEST_DATA = {
    name: "Bivash ROY",
    pseudo: "@bivash_roy",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat assumenda odio fugit iusto dicta omnis reprehenderit ab laudantium ex! Et animi possimus quaerat nam corporis minima harum assumenda laborum nobis?"
}
export function Account(){
    return(
        <div className="container mx-auto p-4">
            <div id="top" className="flex gap-8">
                <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback>{TEST_DATA.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-lg font-bold">{TEST_DATA.name}</h3>
                    <p>{TEST_DATA.pseudo}</p>
                </div>
            </div>
            <p className="mt-4 sm:w-2/3">{TEST_DATA.description}</p>

            <div className="grid grid-cols-1 my-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-gray-500">
                    Security
                </div>
                <div className="bg-gray-500">
                    Billings
                </div>
                <div className="bg-gray-500">Profile</div>
                <div className="bg-gray-500">test</div>
                <div className="bg-gray-500">test</div>
                <div className="bg-gray-500">test</div>
                <div className="bg-gray-500">test</div>
                <div className="bg-gray-500">test</div>
                <div className="bg-gray-500">test</div>
                <div className="bg-gray-500">test</div>
            </div>


        </div>
    )
}