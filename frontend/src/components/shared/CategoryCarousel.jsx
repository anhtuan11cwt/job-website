import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CATEGORIES } from "@/utils/constant";

function CategoryCarousel() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Khám phá theo danh mục</h2>
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {CATEGORIES.map((category) => (
            <CarouselItem className="pl-2 md:pl-4 basis-auto" key={category.id}>
              <Button
                className="rounded-full px-6 whitespace-nowrap border-purple-600 text-purple-600 hover:bg-purple-50 hover:text-purple-700"
                variant="outline"
              >
                {category.label}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
