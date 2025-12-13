import { PortableTextBlock } from "next-sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  hotspot?: any;
  crop?: any;
  caption?: string;
}

export interface Category {
  _id?: string;
  title: string;
  slug: { current: string };
}

export interface Author {
  name: string;
  image?: SanityImage;
  bio?: PortableTextBlock[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    substack?: string;
    website?: string;
  };
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: SanityImage;
  excerpt?: string;
  body?: PortableTextBlock[];
  author?: Author;
  categories?: Category[];
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  mainImage?: SanityImage | string;
  categories?: Category[]; 
  body?: PortableTextBlock[];
  linkDemo?: string;
  linkGithub?: string;
}