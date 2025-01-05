import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import { TagType, UserType } from "@/@types/User";
import { getMe } from "@/lib/current";
import { CustomFetch } from "@/lib/customFetch";
import { formatImagesUrl } from "@/lib/imagesUrl";


export function Profile(){
    const [userData, setUserData] = useState<UserType>({ id: 0, email: "", name: "", pseudo: "", bio: "", profile_picture: "" });
    const [userTags, setUserTags] = useState<Array<TagType>>([]);
    const [newUserTags, setNewUserTags] = useState<Array<TagType>>([]);
    const [newImageFile, setNewImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();


    useEffect(() => {
        async function getUserData(){
            const { success, user, tags } = await getMe();

            if(!success){
                return toast("Error", {
                    description: "Internal server error",
                })
            }
            if(user) {
                setUserData(user);
                setUserTags(tags);
                setNewUserTags(tags);
            }
        }
        
        getUserData();
    }, []);

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

    function updateForm(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault();
        setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function saveFormChanges(){

        const removedTags = userTags.filter(
            originalItem => !newUserTags.some(newItem => newItem.tag_id === originalItem.tag_id)
        );
        
        const addedObjects = newUserTags.filter(
            newItem => !userTags.some(originalItem => originalItem.tag_id === newItem.tag_id)
        );

        const newFormData = {
            user: userData,
            tags: {
                add: addedObjects,
                remove: removedTags,
            }
        }

        const { response, error } = await CustomFetch('/user/update', {
            method: 'POST',
            body: JSON.stringify(newFormData),
        });
        if(error || !response?.success){
            return toast("Error", {
                description: "Internal server error"
            })
        }

        // Change the profile picture
        if(newImageFile){
            const ImgformData = new FormData();
            ImgformData.append("image", newImageFile);

            const { response, error } = await CustomFetch("/upload/newProfilePicture", { 
                method: 'POST',
                body: ImgformData,
            });
            if(error || !response?.success){
                return toast("Error", {
                    description: "Internal server error",
                });
            }
        }

        
        if(response?.success){
            navigate('/account');
        }
    }

    function removeTag(id: number){
        const newTagsList = newUserTags.filter((el) => el.tag_id != id);
        setNewUserTags(newTagsList);
    }

    function addNewTag(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if (inputRef.current && inputRef.current?.value.trim() != "") {
            console.log("Input value:", inputRef.current.value);

            const newTagsList = [...newUserTags, { tag_id: Math.random(), name: inputRef.current.value }];
            setNewUserTags(newTagsList);
            inputRef.current.value = "";
            console.log(newUserTags)
            return;
        }
        toast("Error", {
            description: "The name field is empty"
        })
    }
    return(
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Edit you profile</h1>
            <div className="flex md:flex-row flex-col gap-8 md:items-center">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={!newImageFile ? formatImagesUrl(userData.profile_picture) : imagePreview || ""} />
                    <AvatarFallback>{userData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Chnage your profile picture</Label>
                    <Input id="picture" type="file" onChange={handleFileChange} />
                </div>
            </div>
            <div className="mt-8 flex md:flex-row flex-col gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="user_name">User Name</Label>
                    <Input 
                        type="text" 
                        id="user_name" 
                        placeholder="user name" 
                        value={userData.name} 
                        name="name"
                        onChange={updateForm}
                        required
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="user_name">Pseudo</Label>
                    <Input 
                        type="text" 
                        id="pseudo" 
                        placeholder="@pseudo" 
                        value={userData.pseudo} 
                        name="pseudo"
                        onChange={updateForm}
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                        type="text" 
                        id="email" 
                        placeholder="m@exemple.com" 
                        value={userData.email} 
                        name="email"
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
                    value={userData.bio || ""}
                    onChange={updateForm}
                    name="bio"
                />
            </div>
            <div className="mt-5">
                <Label htmlFor="user_name">Profile Tags</Label>
                <div className="space-x-2 space-y-2">
                    <form onSubmit={addNewTag} className="my-1 flex items-center">
                        <Input
                            type="text"
                            placeholder="Name"
                            name="name"
                            className="rounded-r-none w-fit"
                            ref={inputRef}
                            maxLength={30}
                        />
                        <Button type="submit" variant="outline" className="rounded-l-none">Add</Button>
                    </form>
                    {newUserTags.map(el => (
                        <Badge variant="secondary" key={el.tag_id}>
                            {el.name}
                            <X 
                                size={15}
                                className="cursor-pointer hover:text-red-700"
                                onClick={() => removeTag(el.tag_id)}
                            />
                        </Badge>
                    ))}
                </div>
            </div>
            <div className="space-x-2 mt-8">
                <Button variant="outline" onClick={saveFormChanges}>Save Changes</Button>
                <Button variant="destructive" asChild>
                    <Link to="/account">
                        Cancel
                    </Link>
                </Button>
            </div>
        </div>
    )
}