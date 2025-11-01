// lib/sanity.ts (ou onde está sua função getRecursos)
import { client } from '@/lib/client'; 

export async function getRecursos() {
  
  try {
    const query = `
      *[_type == "recurso"] | order(order asc) {
        _id,
        title,
        description,
        mainImage{
          asset->{
            _id,
            url
          }
        },
        ctaText,
        ctaLink,
        content,
        categories[]->{
          _id,
          title
        },
        order,
        featured,
        publishedAt
      }
    `;
    
    const recursos = await client.fetch(query);
    
    
    
    return recursos || [];
  } catch (error) {
    return [];
  }
}