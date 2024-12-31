import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { CustomFetch } from "@/lib/customFetch";

export function Upload(){
    const [isFileDetected, setIsFileDetected] = useState<boolean>(false);
    const [newImageFile, setNewImageFile] = useState(null);
    const [newIMageTitle, setNewIMageTitle] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // @ts-ignore
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith("image/")) {
            // Only set if it's an image
            setNewImageFile(selectedFile); 
            setImagePreview(URL.createObjectURL(selectedFile));
        } else {
            toast("Invalid file type", {
                description: "Please upload an image file (jpg, png, gif, etc.)",
            })
            // Clear the file state if not an image
            setNewImageFile(null); 
        }
    };

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault(); 
        if(!isFileDetected){
            setIsFileDetected(true)
        }
    };

    function handleDragEventFinish(e: React.DragEvent<HTMLDivElement>){
        e.preventDefault(); 
        if(isFileDetected){
            setIsFileDetected(false)
        }
    }

    async function submitForm(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        if (!newImageFile) {
            toast("Invalid file", {
                description: "Please provide an image",
            })
            return;
        }
        if(!newIMageTitle) {
            toast("Invalid title", {
                description: "Please provide a title",
            })
            return;
        }

        const formData = new FormData();
        formData.append("image", newImageFile);
        formData.append("title", newIMageTitle);


        // TODO
        const { response, error } = await CustomFetch("/upload/newImage", { 
            method: 'POST',
            body: formData,
        });
        if(error || !response?.success){
            return toast("Error", {
                description: "Internal server error",
            });
        }
        if(response?.success){
            return toast("Success", {
                description: "New image added",
            });
        }
    }

    return(
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Upload new images ?</h1>
            <form onSubmit={submitForm} className="space-y-4">
                {imagePreview && (
                    <img 
                        src={imagePreview} alt="" 
                        className="max-h-[400px]"
                    />
                )}
                <Input
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragEventFinish}
                    // onDrop={handleDragEventFinish} 
                    className={`
                        md:w-fit border-dashed border-2
                        ${isFileDetected ? "border-blue-700" : "border-gray-500"}
                        `}
                    type="file"
                    onChange={handleFileChange}
                />
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input 
                        type="text" 
                        id="title" 
                        placeholder="Image Title" 
                        value={newIMageTitle} 
                        onChange={e => setNewIMageTitle(e.target.value)}
                    />
                </div>
                <div className="space-x-2">
                    <Button type="submit">Submit</Button>
                    <Button variant="ghost" asChild>
                        <NavLink to="/">Cancel</NavLink>
                    </Button>
                </div>
            </form>
        </div>
    )
}