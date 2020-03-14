import React, { useState } from 'react';
import PropTypes from 'prop-types';

/*const videoTest = [{
    id: "NvBshoIkxLc",
title: "Liverpool vs Atletico Madrid (2-3 AET) | UEFA Champions League highlights",
thumbnailUrl: "https://i.ytimg.com/vi/NvBshoIkxLc/hqdefault.jpg",
duration: "PT11M36S",
definition: "hd",
saved: false,
viewCount: "5341432",
likeCount: "79924",
dislikeCount: "3889",
}]
*/
const VideoItem = props => {
const [savedState, setSavedState] = useState(props.saved);

    function convertISO8601(input) {

        var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
        var hours = 0, minutes = 0, seconds = 0, time;

        if (reptms.test(input)) {
            var matches = reptms.exec(input);
            if (matches[3]) {
                seconds = Number(matches[3]);
                time = seconds + 's';
                            }
            if (matches[2]) {
                minutes = Number(matches[2]);
                time = minutes + 'm ' + seconds + 's';
                          }
            if (matches[1]) {
                hours = Number(matches[1]);
                time = hours + 'h ' + minutes + 'm ' + seconds+ 's';
            }      
        }

        return time;
    }


    return (
        <div className='video-item'>
            <a href={'https://www.youtube.com/watch?v=' + props.id} target='_blanck'>
           <div className='video-item__img'>
                <div className='video-item__duration'>
                    {convertISO8601(props.duration)}
                </div>
                
               <div className="video-item__overlay-container">
               <img src={props.thumbnailUrl} alt={props.title}/> 
                    <div className="video-item__overlay-middle">
                     <div className="video-item__overlay-text"><i className="fa fa-thumbs-up"></i> {props.likeCount}</div>
                     </div>
                        </div>
           </div>
           </a>
           <div className='video-item__title'>
               <span>
                {props.title}
               </span>
           </div>
            <div className='video-item__action'>
                { savedState ? (
                  <button className="video-item__icon-btn video-item__add-btn"onClick={() => {
                    props.onVideoDelete(props.id);
                    setSavedState(false);
                }}>  
                    <div className="video-item__btn-txt">Delete</div>
                  </button>
                ) : (
                    <button className="video-item__icon-btn video-item__add-btn" onClick={() => {
                        props.onVideoAddToLib(props.id);
                        setSavedState(true);
                    }}>
                    <div className="video-item__add-icon"></div>
                    <div className="video-item__btn-txt">Save</div>
                  </button>
                )}
            </div>
        </div>
    )
};

VideoItem.propTypes = {

};

export default VideoItem;
