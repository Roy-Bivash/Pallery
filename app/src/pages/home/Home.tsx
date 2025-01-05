import { ImageCard } from "@/components/image/ImageCard";
import { useEffect, useState } from "react";
import { HomeProps, ImagesList } from "@/@types/Home";
import { CustomFetch } from "@/lib/customFetch";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { AddImageCard } from "@/components/image/AddImageCard";

async function GetMyImages(){
    const { response, error } = await CustomFetch('/images');
    
    if (error || !response?.success) {
        toast("Error", {
            description: "Internal server error"
        })
        return [];
    }

    return response.images;
}
async function GetFavoriteImages(){
    const { response, error } = await CustomFetch('/images/favorite');
    
    if (error || !response?.success) {
        toast("Error", {
            description: "Internal server error"
        })
        return [];
    }
    
    return response.images;
}

export function Home({ favorite = false } : HomeProps){
    const [imagesList, setImagesList] = useState<ImagesList>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getImages();
    }, [favorite]);

    async function getImages(){
        setIsLoading(true)
        // Empty the list
        setImagesList([]);

        if(favorite){
            // If favorite is true then get the images marked as favorite
            const data =  await GetFavoriteImages();
            setImagesList(data);
            setIsLoading(false);
            return;
        }else{
            // If no folder or favorite is specified then show all the images
            const data =  await GetMyImages();
            setImagesList(data);
            setIsLoading(false);
            return;
        }
        
    }

    function removeImageFromList(id:number){
        setImagesList((prevList) => prevList.filter((image) => image.id !== id));
    }

    return(
        <div className="container mx-auto">
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 px-4 my-5">
                {imagesList.map(card => (
                    <ImageCard 
                        removeImageFromList={removeImageFromList}
                        key={card.id}
                        {...card}
                    />
                ))}
                {(imagesList?.length == 0) && !isLoading && (
                    <AddImageCard />
                )}
                {isLoading && (
                    <>
                        <Skeleton className="h-[400px] rounded-xl break-inside-avoid my-4" />
                        <Skeleton className="h-[400px] rounded-xl break-inside-avoid my-4" />
                        <Skeleton className="h-[400px] rounded-xl break-inside-avoid my-4" />
                        <Skeleton className="h-[400px] rounded-xl break-inside-avoid my-4" />
                        <Skeleton className="h-[400px] rounded-xl break-inside-avoid my-4" />
                        <Skeleton className="h-[400px] rounded-xl break-inside-avoid my-4" />
                        <Skeleton className="h-[400px] rounded-xl break-inside-avoid my-4" />
                        <Skeleton className="h-[400px] rounded-xl break-inside-avoid my-4" />
                        <Skeleton className="h-[400px] rounded-xl break-inside-avoid my-4" />
                        <Skeleton className="h-[400px] rounded-xl break-inside-avoid my-4" />
                        <Skeleton className="h-[400px] rounded-xl break-inside-avoid my-4" />
                        <Skeleton className="h-[400px] rounded-xl break-inside-avoid my-4" />
                    </>
                )}
            </div>
        </div>
    )
}