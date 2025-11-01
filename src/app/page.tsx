import { type SanityDocument } from "next-sanity";
import { client } from "@/lib/client";
import HeroSection from "@/components/HeroSection";
import ParallaxHeader from "@/components/ParallaxHeader";
import { SpotlightNewDemo } from "@/components/spotlight";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id, 
  title, 
  slug, 
  publishedAt,
  mainImage,
  excerpt,
  author->{name}
}`;

const options = { next: { revalidate: 30 } };

export default async function HomePage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <>
      {/* HEADER COM PARALLAX */}
      <ParallaxHeader>
        <HeroSection />
      </ParallaxHeader>

      <main id="main-content" role="main" className="min-h-screen"> 
        <SpotlightNewDemo />
      </main>
    </>
  );
}