
export interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
    _type?: string;
  };
}

export interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
    _type?: string;
  };
  mainImage?: any;
  categories?: Category[];
  body?: any;
  linkDemo?: string;
  linkGithub?: string;
  publishedAt?: string;
}

export interface ProjectCardProps {
  project: Project;
}