import { PortableTextBlock } from "next-sanity";

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  hotspot?: unknown; 
  crop?: unknown;
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
  };
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: SanityImage | string;
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