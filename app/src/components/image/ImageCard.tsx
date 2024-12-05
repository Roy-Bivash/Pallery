import { useState } from "react";

import { ImageCardProps } from "@/@types/Grid";
import { ArrowUpRight, Download, X } from "lucide-react";

import { ImageDeleteBtn } from "./ImageDeleteBtn";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

  
export function ImageCard({ id, title, url}: ImageCardProps){
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    return(
        <>
            <Card onClick={() => setIsDrawerOpen(true)} className="break-inside-avoid my-4 cursor-pointer">
                <CardContent className="p-0">
                    <img 
                        src={url} 
                        alt={title}
                        className="transition rounded-md group-hover/card:contrast-[1.1]"
                        loading="lazy"
                    />
                </CardContent>
                {title.trim() && (
                    <CardFooter className="px-1 pt-2 pb-1">
                        <p className="first-letter:capitalize truncate font-semibold">{title}</p>
                    </CardFooter>
                )}
            </Card>
            <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <DrawerContent>
                    <div className="flex justify-end">
                        <DrawerClose asChild>
                            <X 
                                height={24}
                                width={24}
                                className="cursor-pointer mx-4" 
                                />
                        </DrawerClose>
                    </div>
                    <DrawerHeader className="maxh--[25vh]">
                        <DrawerTitle>{title || (<i>No title</i>)}</DrawerTitle>
                        <DrawerDescription className="pt-2">
                            {/* Description */}
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="flex sm:flex-row flex-col items-center justify-center gap-2 pb-8">
                        <section className="">
                            <img src={url} alt={title} className="max-h-[70vh]" />
                        </section>
                        <section className="flex flex-col gap-2">
                            <span className="flex flex-row gap-2">
                                <Button variant="outline" className="w-fit">Open in a new tab <ArrowUpRight /></Button>
                                <Button variant="ghost" className="w-fit">Dawnload <Download /></Button>
                            </span>
                            <ImageDeleteBtn img_id={id} />
                        </section>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}