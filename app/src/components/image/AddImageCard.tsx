import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { NavLink } from "react-router";

export function AddImageCard(){
    return(
        <Card className="group/card break-inside-avoid my-4 cursor-pointer overflow-hidden">
            <div className="h-[400px] px-4 flex flex-col items-center justify-center gap-4">
                <p className="text-center">You don't have any saved image</p>
                <Button variant='ghost' asChild>
                    <NavLink to='/upload'>
                        Add
                    </NavLink>
                </Button>
            </div>
        </Card>
    )
}