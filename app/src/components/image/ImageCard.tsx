import { useState } from "react";

import { ImageCardProps } from "@/@types/Grid";
import { ArrowUpRight, Download, X } from "lucide-react";

import { ImageDeleteBtn } from "./ImageDeleteBtn";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

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
                    <CardFooter className="px-4 sm:px-2 pt-2 pb-1">
                        <p className="first-letter:capitalize truncate font-semibold">{title}</p>
                    </CardFooter>
                )}
            </Card>
            <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <DrawerContent className="h-[95vh]">
                    <div className="flex justify-end">
                        <DrawerClose asChild>
                            <X 
                                height={24}
                                width={24}
                                className="cursor-pointer mx-4 mb-2" 
                                />
                        </DrawerClose>
                    </div>
                    <VisuallyHidden.Root>
                        <DrawerHeader className="maxh--[25vh]">
                            <DrawerTitle>{title || (<i>No title</i>)}</DrawerTitle>
                            <DrawerDescription>
                            </DrawerDescription>
                        </DrawerHeader>
                    </VisuallyHidden.Root>
                    <ScrollArea>
                        <div className="flex sm:flex-row flex-col justify-center gap-4 sm:gap-2 pb-8">
                            <section className="flex justify-center">
                                <img src={url} alt={title} className="max-h-[80vh]" />
                            </section>
                            <section className="px-2 sm:px-0 sm:max-w-[30vw] lg:max-w-[40vw] space-y-2">
                                <h4 className="text-xl cursor-text font-semibold">{title || (<i>No title</i>)}</h4>
                                <span className="flex flex-row gap-2">
                                    <Button variant="outline" className="w-fit">Open in a new tab <ArrowUpRight /></Button>
                                    <Button variant="ghost" className="w-fit">Dawnload <Download /></Button>
                                </span>
                                <ImageDeleteBtn img_id={id} />
                            </section>
                        </div>
                    </ScrollArea>
                </DrawerContent>
            </Drawer>
        </>
    )
}