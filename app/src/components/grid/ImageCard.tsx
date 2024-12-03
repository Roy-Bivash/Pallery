import { ImageCardProps } from "@/@types/Grid"
export function ImageCard({ id, title, url}: ImageCardProps){
    return(
        <div className="transition group/card mb-4 break-inside-avoid rounded-md hover:bg-white hover:shadow-md">
            <img 
                src={url} 
                alt={title}
                className="transition rounded-md group-hover/card:contrast-[1.1]"
            />
            {title && (
                <>
                    {/* <span className="relative group/title w-full"> */}
                        <h3 className="first-letter:capitalize text-md pt-2 pb-1 px-1 font-semibold truncate">{title}</h3>
                        {/* <p className="hidden group-hover/title:block absolute left-0 right-0 top-12 bg-backgroundColor">{title}</p> */}
                    {/* </span> */}
                </>
            ) }
        </div>
    )
}