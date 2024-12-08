import { ImageCardProps } from "@/@types/Grid";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function TestCard({ id, title, url}: ImageCardProps){
    return(
        <Card className="break-inside-avoid my-4 cursor-pointer">
            <CardContent className="p-0">
                <img 
                    src={url} 
                    alt={title}
                    className="transition rounded-md group-hover/card:contrast-[1.1]"
                    loading="lazy"
                />
            </CardContent>
            {title.trim() && (
                <CardFooter className="px-4 sm:px-2 pt-2 pb-1">
                    <p className="first-letter:capitalize truncate font-semibold">{title}</p>
                </CardFooter>
            )}
        </Card>
    )
}