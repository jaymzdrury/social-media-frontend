import Masonry from "react-masonry-css"
import Pin from "./Pin"
import { Pins } from '../utils/types'

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

function MasonryLayout({pins}:{pins: Pins[]}) {

  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
      {pins.map((d,i) => <Pin key={i} img={d.image} userName={d.postedBy.userName} profile={d.postedBy.image} id={d._id} postedId={d.postedBy._id} destination={d.destination} />)}
    </Masonry>
  )
}

export default MasonryLayout