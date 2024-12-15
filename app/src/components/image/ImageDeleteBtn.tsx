import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
  } from "@/components/ui/dialog";
  
interface ImageDeleteBtnProps{
    img_id: Number
}

export function ImageDeleteBtn({img_id}: ImageDeleteBtnProps){
    async function deleteImage(){
        console.log("delete : ", img_id);
        // TODO
    }
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" className="w-fit"><Trash2 /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Delete the image</DialogTitle>
                    <DialogDescription>
                        Are you absolutely sure ?
                        <br />
                        There is no returning back from it.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="destructive" onClick={() => deleteImage()}>Yes</Button>
                    <DialogClose asChild>
                        <Button variant="outline">No</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}