import React, { useState, useEffect } from 'react';
import VideoItem from './VideoItem';
import Loader from './Loader';

/*
const videoTest = {
id: "NvBshoIkxLc",
title: "Liverpool vs Atletico Madrid (2-3 AET) | UEFA Champions League highlights",
thumbnailUrl: "https://i.ytimg.com/vi/NvBshoIkxLc/hqdefault.jpg",
duration: "PT11M36S",
definition: "hd",
saved: false,
viewCount: "5341432",
likeCount: "79924",
dislikeCount: "3889",
}
*/


const SearchedVideos = (props) => {

const [videoItems, setVideoItems] = useState({"items":[]});
  useEffect(() => {
    setVideoItems(props.videos);
  }, []);

let content;
let loader = null;
console.log('props', props);
if(typeof props.videos !== "undefined") {
    
    if (props.fetching) {
        loader = <Loader />
    } else {
        loader = null;
    }
} else {
    if(props.error === null) {
        content = <div>Something went wrong. </div>
    } else {
        content = props.error;
        
    }
    
}

    console.log('videoItems', videoItems);
    return (
        <div className='search-block__videos'>
          {content && <>{content}</>}
          {loader && <>{loader}</>}
           { videoItems.items.length === 0
              ? <div>There is no founded video. </div>
              : <>{
                videoItems.items.map((item, index) => {
                    return <VideoItem key={index} {...item} />
               })
              }</>
           }
        </div>
    )
}

export default SearchedVideos;
