import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

function ProjectShowcase() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <div className="mb-20 h-full w-full max-w-2xl min-w-xs rounded-lg border p-5">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="mb-5 text-2xl font-semibold">Project Showcase</h2>
        <div className="flex w-full flex-col items-center justify-center gap-2 max-sm:px-2">
          <Carousel setApi={setApi} className="w-[80%]">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="max-w-[280px]">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="text-muted-foreground py-2 text-center text-sm">
            Slide {current} of {count}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectShowcase;
