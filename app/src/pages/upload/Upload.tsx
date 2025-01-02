import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { CustomFetch } from "@/lib/customFetch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Upload(){
    const [isFileDetected, setIsFileDetected] = useState<boolean>(false);
    const [newImageFile, setNewImageFile] = useState(null);
    const [newIMageTitle, setNewIMageTitle] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [newImageLink, setNewImageLink] = useState<string>("");

    // @ts-ignore
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith("image/")) {
            // Only set if it's an image
            setNewImageFile(selectedFile); 
            setImagePreview(URL.createObjectURL(selectedFile));
            if(newIMageTitle.trim() == ""){
                setNewIMageTitle(selectedFile.name)
            }
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

    async function submitFormUpload(e:React.FormEvent<HTMLFormElement>){
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
            setNewImageFile(null);
            setImagePreview(null);
            setNewIMageTitle("");
            return toast("Success", {
                description: "New image added",
            });
        }
    }

    async function submitFormLink(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(!newIMageTitle || !newImageLink) {
            toast("Invalid title", {
                description: "Please fill the form",
            })
            return;
        }

        const { response, error } = await CustomFetch("/images/newLinkImage", { 
            method: 'POST',
            body: JSON.stringify({
                title: newIMageTitle,
                link: newImageLink
            }),
        });
        if(error || !response?.success){
            return toast("Error", {
                description: "Internal server error",
            });
        }
        if(response?.success){
            setNewIMageTitle("");
            setNewImageLink("");
            return toast("Success", {
                description: "New image added",
            });
        }
    }
    return(
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Upload new images ?</h1>
            <Tabs defaultValue="file" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="file">File</TabsTrigger>
                    <TabsTrigger value="link">Link</TabsTrigger>
                </TabsList>
                <TabsContent value="file">
                    <form onSubmit={submitFormUpload} className="space-y-4 w-full pt-4">
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
                                md:w-fit max-w-[70vw] border-dashed border-2
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
                                required
                            />
                        </div>
                        <div className="space-x-2">
                            <Button type="submit">Upload</Button>
                            <Button variant="ghost" asChild>
                                <NavLink to="/">Cancel</NavLink>
                            </Button>
                        </div>
                    </form>
                </TabsContent>
                <TabsContent value="link">
                    <form onSubmit={submitFormLink} className="space-y-4 w-full pt-4">
                        <div className="grid max-w-sm items-center gap-1.5">
                            <Label htmlFor="title">Image link</Label>
                            <Input 
                                type="text" 
                                id="link" 
                                placeholder="https://exemple.com" 
                                value={newImageLink}
                                onChange={e => setNewImageLink(e.target.value)}
                                required
                            />
                            <p className="text-sm italic">Note: The image provided on the link will not be downloaded</p>
                        </div>
                        <div className="grid max-w-sm items-center gap-1.5">
                            <Label htmlFor="title">Title</Label>
                            <Input 
                                type="text" 
                                id="title" 
                                placeholder="Image Title" 
                                value={newIMageTitle} 
                                onChange={e => setNewIMageTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-x-2">
                            <Button type="submit">Add</Button>
                            <Button variant="ghost" asChild>
                                <NavLink to="/">Cancel</NavLink>
                            </Button>
                        </div>
                    </form>
                    
                </TabsContent>
            </Tabs>
        </div>
    )
}