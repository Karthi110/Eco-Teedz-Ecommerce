import ProductCard from "@/components/product/product-card";
import MaxWidthWrapper from "@/components/root/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { STATEMENTS } from "@/constants";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-center">
      <section className="w-full h-fit flex flex-col justify-center items-center lg:flex-row-reverse gap-8 py-10 md:py-20 animate-fade-in border-b-2 border-dashed ">
        <div className="w-[70%] lg:w-[90%] flex-[.8] flex items-center justify-center">
          <Image
            src="/mission2.png"
            alt="banner"
            width={450}
            height={1100}
            priority
            className="rounded-md shadow-lg border-2 bg-gradient-to-tr from-slate-100 via-slate-200 to-slate-300 "
          />
        </div>
        <div className="flex flex-1 flex-col items-start justify-center space-y-6 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl text-primary font-bold leading-tight">
            Eco-Friendly T-Shirts:
            <span className="bg-orange-400 text-transparent bg-clip-text">
              Raise Wildlife🐾 Awareness
            </span>{" "}
            in Style.
          </h1>
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl">
            Join us in raising awareness about wildlife conservation with our
            sustainably-made eco-friendly t-shirts.
          </p>
          <Link
            href="/collections"
            className={buttonVariants({
              size: "lg",
              className:
                "text-base md:text-lg lg:text-xl w-fit mx-auto lg:mx-0 shadow-md",
            })}
          >
            Shop now <ArrowRight className="w-5 h-5 ml-1" />
          </Link>
        </div>
      </section>
      {/* TODO get from database  */}
      <section className="p-4 md:py-10 space-y-6 md:space-y-20 mt-0 md:mt-10 lg:mt-0 border-b-2 border-dashed flex flex-col items-center justify-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-center lg:text-left">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductCard
            title="Panda T-shirt"
            imgUrl="/test.png"
            OrgPrice="900"
            price="559"
          />
          <ProductCard
            title="Bird T-shirt"
            imgUrl="/mission2.png"
            price="659"
          />
          <ProductCard
            title="Panda T-shirt"
            imgUrl="/test.png"
            OrgPrice="900"
            price="559"
          />
          <ProductCard
            title="Bird T-shirt"
            imgUrl="/mission2.png"
            price="659"
          />
        </div>
        <Link
          href="/collections"
          className={buttonVariants({
            size: "sm",
            className: "text-sm md:text-base shadow-md",
            variant: "outline",
          })}
        >
          View all <ArrowRight className="w-4 h-4 ml-1 animate-pulse" />
        </Link>
      </section>

      <section className="p-6 md:p-10 space-y-10 border-b-2 border-dashed">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-20">
          <div className="flex items-center justify-center flex-[.6] w-[60%] lg:w-[90%]">
            <Image
              src="/mission2.png"
              alt="mission"
              width={1080}
              height={1136}
              className="rounded-md bg-gradient-to-tr from-slate-100 via-slate-200 to-slate-300 shadow-lg border-2"
              loading="lazy"
            />
          </div>
          <div className="flex flex-1 flex-col items-center lg:items-start justify-start space-y-4 text-center lg:text-left">
            <h3 className="text-3xl md:text-5xl font-semibold">Our Mission</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              At <b>EcoTeedz</b>, we harness the power of fashion to drive
              positive change. Our eco-friendly t-shirts are crafted from
              sustainable materials and feature unique designs that highlight
              endangered species, raising awareness and supporting conservation.
              Each shirt tells a story, promoting knowledge and inspiring action
              to protect vulnerable wildlife. By choosing EcoTeeds, you’re
              making a fashion statement that values the environment and
              sustainability🐾
            </p>
          </div>
        </div>
      </section>
      {/* TODO add collections  */}
      <section className="p-6 lg:p-10 space-y-10">
        <h3 className="text-4xl md:text-5xl font-bold text-center lg:text-left">
          Why Choose Us?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {STATEMENTS.map((statement) => (
            <Card
              key={statement.alt}
              className="border-none shadow-md bg-primary/20 w-full"
            >
              <CardHeader>
                <div className="w-full max-w-md">
                  <Image
                    src={statement.imgUrl}
                    alt={statement.alt}
                    width={1200}
                    height={600}
                    className="h-[200px] md:h-[200px] lg:h-[300px] object-cover rounded-md"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-2">
                <p className="text-base">{statement.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </MaxWidthWrapper>
  );
}
