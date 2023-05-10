import { useState } from "react"
import { AiTwotoneDelete } from 'react-icons/ai'
import { MdDownloadForOffline } from 'react-icons/md'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { client, urlFor } from '../client'
import { SanityImageAssetDocument } from "@sanity/client"
import LoadedPin from './Pin-Loaded'

const HoveredComponent = ({link, id, destination}:{link: SanityImageAssetDocument, id: string, destination: string}) => {

  const deletePin = (thisId: string) => client.delete(thisId).then(() => window.location.reload())

  return (
    <div 
      className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
      style={{ height: '100%' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <a
            href={`${link?.asset?.url}?dl=`}
            download
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
          >
            <MdDownloadForOffline />
          </a>
        </div>
        <button
          onClick={e => e.stopPropagation()}
          type="button"
          className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
        >
          Save
        </button>
      </div>
      <div className=" flex justify-between items-center gap-2 w-full">
        <a
          href={destination}
          target="_blank"
          className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
          rel="noreferrer"
        >
          {' '}
          <BsFillArrowUpRightCircleFill />
          {destination.slice(8,20)}
        </a>
      </div>
      <button
        type="button"
        onClick={e => {
          e.stopPropagation()
          deletePin(id)
        }}
        className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
      >
        <AiTwotoneDelete />
      </button>
    </div>
  )
}

function Pin({img, userName, profile, id, postedId, destination}:{img: SanityImageAssetDocument, userName: string, profile: string, id: string, postedId: string, destination: string}) {
  const [hovered, hoveredSet] = useState(false)

  return (
    <LoadedPin 
      src={urlFor(img).width(250).url()} 
      alt={img.originalFilename ?? ''} 
      hovered={hovered}
      hoveredSet={hoveredSet}
      postedId={postedId}
      id={id}
      userName={userName}
      profile={profile}
    >
      <HoveredComponent link={img} id={id} destination={destination} />
    </LoadedPin>
  )
}

export default Pin