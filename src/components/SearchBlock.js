import React, { useEffect, useState, Fragment } from 'react';
import SearchPanel from './SearchPanel';
import { connect } from "react-redux";
import * as types from '../constants/actions';
import * as urls from '../constants/api';
import axios from "axios";
import VideoItem from './VideoItem';
import Loader from './Loader';
import {useDispatch } from "react-redux";

const JSONDATA = {"items":[{"id":"_mdKvblL_8s","title":"$70,000 Extreme Hide And Seek - Challenge","thumbnailUrl":"https://i.ytimg.com/vi/_mdKvblL_8s/hqdefault.jpg","duration":"PT18M41S","definition":"hd","saved":false,"viewCount":"6781354","likeCount":"457621","dislikeCount":"4324"},{"id":"q_WM_pMp0Hg","title":"Trump Holds News Conference On Coronavirus Pandemic | NBC News (Live Stream Recording)","thumbnailUrl":"https://i.ytimg.com/vi/q_WM_pMp0Hg/hqdefault.jpg","duration":"PT2H16M48S","definition":"hd","saved":false,"viewCount":"2604658","likeCount":"17902","dislikeCount":"7532"},{"id":"jNn2F39G-6s","title":"Terror in Demacia | League of Legends","thumbnailUrl":"https://i.ytimg.com/vi/jNn2F39G-6s/hqdefault.jpg","duration":"PT1M21S","definition":"hd","saved":false,"viewCount":"2821168","likeCount":"208438","dislikeCount":"1184"},{"id":"_furo8XLvO8","title":"YoungBoy Never Broke Again - Unchartered Love [Official Music Video]","thumbnailUrl":"https://i.ytimg.com/vi/_furo8XLvO8/hqdefault.jpg","duration":"PT2M56S","definition":"hd","saved":false,"viewCount":"2492550","likeCount":"186782","dislikeCount":"3418"},{"id":"AvI9VajdE2s","title":"Lil Uzi Vert - Bean (Kobe) feat. Chief Keef [Official Audio]","thumbnailUrl":"https://i.ytimg.com/vi/AvI9VajdE2s/hqdefault.jpg","duration":"PT4M","definition":"hd","saved":false,"viewCount":"1182790","likeCount":"79724","dislikeCount":"838"},{"id":"aKhPbVN_Rbw","title":"When Rehearsal Becomes The Show: Stephen Colbert's First-Ever No-Audience Late Show Monologue","thumbnailUrl":"https://i.ytimg.com/vi/aKhPbVN_Rbw/hqdefault.jpg","duration":"PT13M18S","definition":"hd","saved":false,"viewCount":"3299725","likeCount":"78415","dislikeCount":"2588"},{"id":"Qn0RfE4aruk","title":"Normal Life Comes To A Halt For Americans In Response To Coronavirus | TODAY","thumbnailUrl":"https://i.ytimg.com/vi/Qn0RfE4aruk/hqdefault.jpg","duration":"PT13M49S","definition":"hd","saved":false,"viewCount":"883982","likeCount":"6638","dislikeCount":"833"},{"id":"Nz2tzeY31MQ","title":"Tom MacDonald - \"I Dont Care\"","thumbnailUrl":"https://i.ytimg.com/vi/Nz2tzeY31MQ/hqdefault.jpg","duration":"PT4M23S","definition":"hd","saved":false,"viewCount":"382114","likeCount":"44354","dislikeCount":"1518"},{"id":"63M9ZQd2B7M","title":"Coronavirus expert says he has second thoughts about flying","thumbnailUrl":"https://i.ytimg.com/vi/63M9ZQd2B7M/hqdefault.jpg","duration":"PT9M34S","definition":"hd","saved":false,"viewCount":"669530","likeCount":"6154","dislikeCount":"671"},{"id":"a3Co5T7F16E","title":"Dr. Fauci: I Expect More Cases And I Expect An Acceleration Of Testing | Morning Joe | MSNBC","thumbnailUrl":"https://i.ytimg.com/vi/a3Co5T7F16E/hqdefault.jpg","duration":"PT14M44S","definition":"hd","saved":false,"viewCount":"317202","likeCount":"2875","dislikeCount":"241"},{"id":"VwsGzkLu-j0","title":"Let's talk about Coronavirus","thumbnailUrl":"https://i.ytimg.com/vi/VwsGzkLu-j0/hqdefault.jpg","duration":"PT7M10S","definition":"hd","saved":false,"viewCount":"2335629","likeCount":"273965","dislikeCount":"4512"},{"id":"EJJPokdkyV4","title":"The Blinding","thumbnailUrl":"https://i.ytimg.com/vi/EJJPokdkyV4/hqdefault.jpg","duration":"PT2M49S","definition":"hd","saved":false,"viewCount":"327228","likeCount":"5520","dislikeCount":"304"},{"id":"IYQzyA3TjWs","title":"Going To Work With My Dad For A Day (we demolished a bathroom 🤮)","thumbnailUrl":"https://i.ytimg.com/vi/IYQzyA3TjWs/hqdefault.jpg","duration":"PT13M59S","definition":"hd","saved":false,"viewCount":"681896","likeCount":"57357","dislikeCount":"1310"},{"id":"mmlyHMLeo1o","title":"David Dobrik Experiences Real Pain While Eating Spicy Wings | Hot Ones","thumbnailUrl":"https://i.ytimg.com/vi/mmlyHMLeo1o/hqdefault.jpg","duration":"PT25M17S","definition":"hd","saved":false,"viewCount":"4790584","likeCount":"240127","dislikeCount":"6483"},{"id":"T6bjC8R2pUw","title":"State of emergency declared in New York City over coronavirus","thumbnailUrl":"https://i.ytimg.com/vi/T6bjC8R2pUw/hqdefault.jpg","duration":"PT6M28S","definition":"hd","saved":false,"viewCount":"1550604","likeCount":"14928","dislikeCount":"1224"},{"id":"Udxl17LVHYA","title":"Bichiyal - Bad Bunny x Yaviah ( Video Oficial )","thumbnailUrl":"https://i.ytimg.com/vi/Udxl17LVHYA/hqdefault.jpg","duration":"PT4M26S","definition":"hd","saved":false,"viewCount":"2112788","likeCount":"212498","dislikeCount":"2901"},{"id":"N5ShoQimivM","title":"[MV] V (BTS) - Sweet Night [이태원 클라쓰 OST Part.12 (ITAEWON CLASS OST Part.12)]","thumbnailUrl":"https://i.ytimg.com/vi/N5ShoQimivM/hqdefault.jpg","duration":"PT3M30S","definition":"hd","saved":false,"viewCount":"8871012","likeCount":"724804","dislikeCount":"3157"},{"id":"09StnBCCc7U","title":"Weird Fast Food Crimes (GAME)","thumbnailUrl":"https://i.ytimg.com/vi/09StnBCCc7U/hqdefault.jpg","duration":"PT12M48S","definition":"hd","saved":false,"viewCount":"238880","likeCount":"7073","dislikeCount":"117"},{"id":"J_JgpXKFNM8","title":"Cutting 7 INCHES Off My ALREADY SHORT Hair BY ACCIDENT!","thumbnailUrl":"https://i.ytimg.com/vi/J_JgpXKFNM8/hqdefault.jpg","duration":"PT20M3S","definition":"hd","saved":false,"viewCount":"788619","likeCount":"37223","dislikeCount":"2770"},{"id":"YEq-cvq_cK4","title":"Luke Bryan - One Margarita (Official Music Video)","thumbnailUrl":"https://i.ytimg.com/vi/YEq-cvq_cK4/hqdefault.jpg","duration":"PT3M19S","definition":"hd","saved":false,"viewCount":"312913","likeCount":"10333","dislikeCount":"365"}],"nextPageToken":"CBQQAA"}
const JSONDATAX = {"items":[]};
let JSONDATAY;

const SearchBlock = (props) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
       props.onRequestTrendVideos();
       /*if (props.videos.items.length > 0 ) {
        setVideoItems(props.videos);
        console.log('SET')
      }*/
//console.log('did mounte')

    }, []);
    const videoAddToLib = (id) => {
      dispatch({ type: types.API_ADD_TO_LIB_REQUEST, addId: id });
      };

      const videoDelete = (id) => {
        dispatch({ type: types.API_DELETE_VIDEO_REQUEST, deleteId: id });
        };

    
/*
   function addVideoToLib(id) {
      async function f() {
      const result = await axios({
          method: "put",
          url: urls.API_LIB_VIDEO_URL + id
        });
        console.log(id);
        console.log(result);
        if (result.status >= 200 && result.status < 205) {
          props.onRequestLibVideos();
        }
      }
      f();
  }

*/

  let outContent = null;
  let loader = null;
  //console.log('props', props);

      
     
    return (
        <div className='search-block'>
            <SearchPanel />
            <div className='search-block__videos'>
           
          { props.videos.items.length > 0 && !props.fetching
           ?  <>{
            props.videos.items.map((item, index) => {
                    return <VideoItem key={index} {...item} onVideoAddToLib={videoAddToLib} onVideoDelete={videoDelete}/>
               })
              }</>
              : <>{(props.error && <div className='search-block__error'><span>{props.error.toString()}</span></div>) 
                || (props.fetching && <Loader />) 
                || (props.videos.items.length === 0 && !props.fetching && <div className='search-block__error'><span>No videos founded</span></div>)}</>
            }
          

        </div>
            
         </div>
    )
}

const mapStateToProps = state => {
    return {
      fetching: state.videos.fetching,
     videos: state.videos.videos,
     //videos: JSONDATAX,
      error: state.videos.error
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      onRequestTrendVideos: () => dispatch({ type: types.API_CALL_REQUEST }),
      onRequestLibVideos: () => dispatch({ type: types.API_CALL_LIB_REQUEST })
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SearchBlock);
