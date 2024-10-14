'use client'

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export function CarouselSize() {
  const [open, setOpen] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const images = [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ]

  const handleCardClick = (index: number) => {
    setSelectedIndex(index)
    setOpen(true)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
      >
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index} className="md:basis-1/3">
              <div className="p-1">
                <Card 
                  className="cursor-pointer transition-transform hover:scale-105"
                  onClick={() => handleCardClick(index)}
                >
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <Image
                      src={src}
                      alt={`Image ${index + 1}`}
                      width={200}
                      height={200}
                      className="rounded-lg object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%]">
          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((offset) => {
              const index = (selectedIndex + offset) % images.length
              return (
                <Card key={index}>
                  <CardContent className="p-2">
                    <Image
                      src={images[index]}
                      alt={`Expanded Image ${index + 1}`}
                      width={400}
                      height={400}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}