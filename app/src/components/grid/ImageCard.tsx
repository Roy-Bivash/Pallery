import { ImageCardProps } from "@/@types/Grid"
export function ImageCard({ id, title, url}: ImageCardProps){
    return(
        <div className="mb-4">
            <img src={url} alt={title} />
            <h3>{title}</h3>
        </div>
    )
}