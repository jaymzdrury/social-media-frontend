import { SanityImageAssetDocument } from "@sanity/client";

export interface Params {
    [key: string]: string | undefined;
    pinId: string;
}  

export interface Pins {
    _id: string,
    image: SanityImageAssetDocument,
    userId: number,
    title: string,
    destination: string,
    about: string,
    category: string,
    postedBy: {
      _id: string, 
      userName: string,
      image: string
    }
    comments: Comment[]
}

interface Comment {
  postedBy: {
    _id: string, 
    userName: string,
    image: string
  }
  comment: string
}

interface Profile {
    image: string,
    userName: string
}

export interface UserProfile {
    pins: Pins[],
    profile: Profile,
    text: string
}

export interface CreatePin {
  title: string,
  about: string,
  loading: boolean,
  destination: string,
  fields: string,
  category: string,
  imageAsset: {
    _id: string,
    url: string
  },
  wrongImageType: boolean
}