import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { apiVersion, dataset, projectId } from '@/sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => {
  if (!source) return null
  return builder.image(source)
}