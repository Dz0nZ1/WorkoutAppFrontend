'use client'
import {Card, CardFooter, Image, Button} from "@nextui-org/react";

type Image ={
    image: string
}

export default function MainCard({image} : Image) {

    return(

           <>
               <Card
                   isFooterBlurred
                   radius="lg"
                   className="border-none"
                   style={{ width: '100%', height: '100%' }}
               >
                   <Image
                       alt="Woman listening to music"
                       className="object-cover"
                       height={500}
                       src={image}
                       width={500}
                   />
                   <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                       <p className="text-tiny text-white/80">Profile Available soon.</p>
                       <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                           Notify me
                       </Button>
                   </CardFooter>
               </Card>
           </>
    )
}