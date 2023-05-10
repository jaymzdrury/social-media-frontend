import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
    projectId: import.meta.env.VITE_PROJECT_ID,
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-05-03',
    token: import.meta.env.VITE_SANITY_TOKEN
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: SanityImageSource) => builder.image(source)