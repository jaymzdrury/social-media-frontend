import { useCallback, useEffect, useState } from "react"
import { urlFor } from "../client"
import { SanityImageAssetDocument } from "@sanity/client"

export default function useLoader(img: string | SanityImageAssetDocument, type: 'string' | 'sanity'){
    const [imgSrc, imgSrcSet] = useState('')
    const [loading, loadingSet] = useState(true)

    const onLoad = useCallback(async() => {
        type === 'sanity' ? imgSrcSet(urlFor(img).url()) : imgSrcSet(img as string)
        loadingSet(false)
    }, [img, type])

    const onError = useCallback(async() => {
        imgSrcSet('')
    }, [])

    useEffect(() => {
        const i = new Image()
        i.src = type === 'sanity' ? urlFor(img).url() : img as string
        i.addEventListener('load', onLoad)
        i.addEventListener('error', onError)
        return () => {
            i.removeEventListener('load', onLoad)
            i.removeEventListener('error', onError)
        }
    },[img, type, onLoad, onError])

    return {imgSrc, loading}
}