import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { AspectRatio } from "../ui/aspect-ratio";

interface ImageSliderProps {
  imgUrls: string[];
}

const ImageSlider = ({ imgUrls }: ImageSliderProps) => {
  return (
    <Carousel
      className="w-full max-w-sm lg:max-w-lg h-fit border-2 rounded-md shadow-sm"
      opts={{ align: "center" }}
    >
      <CarouselContent className="w-full p-2">
        {imgUrls.map((imgUrl, idx) => (
          <CarouselItem key={idx}>
            <AspectRatio
              ratio={1 / 1.1}
              className="flex flex-col items-center justify-center"
            >
              <Image
                src={imgUrl}
                alt="product image"
                width={1080}
                height={1136}
                className="object-contain"
                priority
              />
              <span className="text-xs">
                {idx + 1} / {imgUrls.length}
              </span>
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ImageSlider;
