import { ImageCardProps } from "@/@types/Grid";
import { useDrawer } from "@/hooks/useDrawer";
import { Button } from "@/components/ui/button"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
  } from "@/components/ui/drawer"
import { useState } from "react";
  
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
                <CardFooter className="px-1 pt-2 pb-1">
                    <p className="first-letter:capitalize truncate font-semibold">{title}</p>
                </CardFooter>
            </Card>
            <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                    </DrawerHeader>
                    <div className="w-fit">
                        <img src={url} alt={title} className="max-h-[70vh]" />
                    </div>
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}