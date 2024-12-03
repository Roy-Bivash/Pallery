import { ImageCard } from "./ImageCard";
import { GridProps } from "@/@types/Grid";

export function Grid({ cards }: GridProps){
    return(
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 sm:px-0 px-4 my-5">
            {cards.map(card => (
                <ImageCard key={card.id} {...card} />
            ))}
        </div>
    )
}