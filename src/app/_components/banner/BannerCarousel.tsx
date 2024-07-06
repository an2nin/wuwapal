import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/app/_components/ui/carousel";
import BannerCarouselItem from "@/app/_components/banner/BannerCarouselItem";

export default function BannerCarousel() {
    return (
        <Carousel
            orientation="vertical"
            className="w-full max-w-xs"
            opts={{
                align: "start",
            }}
        >
            <CarouselContent className="h-[400px]">
                <CarouselItem className="md:basis-1/4">
                    <BannerCarouselItem />
                </CarouselItem>
                <CarouselItem className="md:basis-1/4">
                    <BannerCarouselItem />
                </CarouselItem>
                <CarouselItem className="md:basis-1/4">
                    <BannerCarouselItem />
                </CarouselItem>
                <CarouselItem className="md:basis-1/4">
                    <BannerCarouselItem />
                </CarouselItem>
                <CarouselItem className="md:basis-1/4">
                    <BannerCarouselItem />
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
