interface ImageCardData {
    id: number;
    url: string;
    title: string;
    favorite: boolean,
}

interface GridProps {
    cards: Array<ImageCardData>
}

interface ImageCardProps extends ImageCardData {}

export type {
    ImageCardData,
    GridProps,
    ImageCardProps
};
