import React, { useEffect } from 'react';
import SearchPanel from './SearchPanel';
import { connect } from "react-redux";
import * as types from '../constants/actions';
import VideoItem from './VideoItem';
import Loader from './Loader';
import {useDispatch } from "react-redux";

const SearchBlock = (props) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
       props.onRequestTrendVideos();

    }, []);
    const videoAddToLib = (id) => {
      dispatch({ type: types.API_ADD_TO_LIB_REQUEST, addId: id });
      };

      const videoDelete = (id) => {
        dispatch({ type: types.API_DELETE_VIDEO_REQUEST, deleteId: id });
        };

 
     
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
