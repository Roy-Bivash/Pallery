interface UserType{
    id: number;
    email: string;
    name: string;
    pseudo: string;
    bio: string;
    profile_picture: string;
};

interface TagType{
    tag_id: number;
    name: string;
}

export type {
    UserType,
    TagType
}