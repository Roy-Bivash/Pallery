import { ImageCard } from "@/components/image/ImageCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { HomeProps, HomeParams, ImagesList } from "@/@types/Home";
import { CustomFetch } from "@/lib/customFetch";
import { toast } from "sonner";

const TEST_DATA : ImagesList = [
    {
        id:1,
        url:"https://i.pinimg.com/736x/48/ad/82/48ad821ca4ef5b357193161d74b848b0.jpg",
        title: "-US- Jennifer Nguyen",
        favorite: true
    },
    {
        id:6765,
        url: "https://i.pinimg.com/736x/c2/bf/9e/c2bf9e65289e2f50bf4bf7ca426708a3.jpg",
        title: "Kasper Aurelius",
        favorite: false,
    },
    {
        id:2,
        url: "https://i.pinimg.com/736x/0f/54/50/0f545014a699daf452af1901afc11db0.jpg",
        title: "Makima",
        favorite: true
    },
    {
        id:3,
        url:"https://i.pinimg.com/736x/32/83/42/328342f70dd1949aa285c201ca0798a7.jpg",
        title: "",
        favorite: false
    },
    {
        id:98,
        url: "https://i.pinimg.com/736x/e6/40/cf/e640cf84a718f664e968fa6970d8b3f4.jpg",
        title: "akil",
        favorite: false,
    },
    {
        id:150,
        url: "https://i.pinimg.com/736x/4d/63/be/4d63bee3d5a508556fa17f4e277e5a18.jpg",
        title: "ahmed mohey",
        favorite: false,
    },
    {
        id:4,
        url:"https://i.pinimg.com/736x/89/1a/41/891a4167ec39769a4bc2b3de9b9a5328.jpg",
        title: "",
        favorite: false
    },
    {
        id:5,
        url:"https://i.pinimg.com/736x/f5/57/b0/f557b0f2692bf83189abbc294ad7d0e5.jpg",
        title: "Minh Hà Quang",
        favorite: false
    },
    {
        id:6,
        url:"https://i.pinimg.com/736x/61/3d/d2/613dd249d9952b326eb972d628720f18.jpg",
        title: "bald juleq",
        favorite: true
    },
    {
        id:7,
        url:"https://i.pinimg.com/736x/c8/72/f4/c872f49763f09360b8fd88222ef1186a.jpg",
        title: "Miss UltraVioleta",
        favorite: false
    },
    {
        id:8,
        url:"https://i.pinimg.com/736x/c6/16/e1/c616e1981e81fbc28d266991c205840c.jpg",
        title: "Ebrahim Saban",
        favorite: true
    },
    {
        id:9,
        url:"https://i.pinimg.com/736x/2a/c5/27/2ac527e3618bf933810446b30aa6638f.jpg",
        title: "🌼Kaoru Hana Wa Rin To Saku🌼",
        favorite: false
    },
    {
        id:10,
        url:"https://i.pinimg.com/736x/f6/57/12/f65712857e1fd1725747c8e49c46e6e6.jpg",
        title: "gan thummim",
        favorite: false
    },
    {
        id:11,
        url:"https://i.pinimg.com/736x/62/fd/95/62fd958acf3cf854ce7f2c11fbd32f60.jpg",
        title: "Lusine Hayrapetyan",
        favorite: true
    },
    {
        id:329,
        url:"https://i.pinimg.com/736x/16/cd/7d/16cd7d4b4805dfe96850f55edebcec32.jpg",
        title: "Felipe Muñoz",
        favorite: true
    },
    {
        id:12,
        url:"https://i.pinimg.com/736x/c3/dc/74/c3dc7408a42106c59c2ad9a8c8310d3d.jpg",
        title: "hamayza : Guts wallpaper",
        favorite: false
    },
    {
        id:13,
        url:"https://i.pinimg.com/736x/c3/dc/74/c3dc7408a42106c59c2ad9a8c8310d3d.jpg",
        title: "hamayza : Guts wallpaper test test test test test test test test",
        favorite: false
    },
    {
        id:14,
        url:"https://i.pinimg.com/736x/6b/cd/da/6bcddaab2a2dbdd11c832ac08d742626.jpg",
        title: "Softwild",
        favorite: false
    },
    {
        id:15,
        url:"https://i.pinimg.com/736x/d1/0e/9c/d10e9c8ec4ae9c180945ff9fc70ef09b.jpg",
        title: "day glo",
        favorite: false
    },
    {
        id:16,
        url:"https://i.pinimg.com/736x/10/1b/79/101b79aeb1fe094cb7fbcf7004a81d88.jpg",
        title: "Hands and flowers",
        favorite: true
    },
    {
        id:17,
        url:"https://i.pinimg.com/736x/a8/2a/86/a82a86130c8230ac8d97083a9086fba6.jpg",
        title: "sakura skull",
        favorite: false
    },
    {
        id:18,
        url:"https://i.pinimg.com/736x/ab/6c/ff/ab6cff218fda46ddcc41494481cd2401.jpg",
        title: "La_reina_mweni",
        favorite: false
    },
    {
        id:19,
        url:"https://i.pinimg.com/736x/ab/6c/ff/ab6cff218fda46ddcc41494481cd2401.jpg",
        title: "La_reina_mweni : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quos consequatur facere molestias culpa voluptatem quasi, consectetur ipsum autem porro vel tenetur rem quas aliquid dolorum nesciunt delectus recusandae perferendis!",
        favorite: false
    },
];

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
async function GetFolderImages(folderId: number){
    // TODO
    return [];
}

export function Home({ favorite = false } : HomeProps){
    const { id : folderId } = useParams<HomeParams>();
    const [imagesList, setImagesList] = useState<ImagesList>([]);

    useEffect(() => {
        getImages();
    }, [favorite]);

    async function getImages(){
        // Empty the list
        setImagesList([]);

        if(favorite){
            // If favorite is true then get the images marked as favorite
            console.log("favorites : ", favorite);
            console.log("Display the favorite images");

            const data =  await GetFavoriteImages();
            setImagesList(data);
            return;
        }else{
            // If no folder or favorite is specified then show all the images
            console.log("favorites : ", favorite ?? false);
            console.log("Display all the images");
            
            const data =  await GetMyImages();
            setImagesList(data);
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
            </div>
        </div>
    )
}