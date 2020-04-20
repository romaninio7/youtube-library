import React, { useEffect } from 'react';
import VideoItem from './VideoItem';
import Loader from './Loader';
import { connect } from 'react-redux';
import * as actions from '../actions';

const LibraryBlock = ({ libraryVideos, error, fetching, deleteVideo }) => {
  // Starting a horizontal scroll listenning after loading
  useEffect(() => {
    const el = document.querySelector('#libId');
    function scrollHorizontally(e) {
      e = window.event || e;
      e.preventDefault();
      el.scrollLeft -= e.wheelDelta || -e.detail;
    }
    (function initScroll() {
      if (!el) {
        return;
      }
      if (el.addEventListener) {
        el.addEventListener('mousewheel', scrollHorizontally, false);
        el.addEventListener('DOMMouseScroll', scrollHorizontally, false);
      }
    })();
  }, []);

  // Helping function to generate a list of videos

  const renderList = (libraryVideos, fetching, error) => {
    // Empty library
    if (libraryVideos.length === 0 && !fetching) {
      return (
        <div className="library-block__error">
          <span>Your library is empty</span>
        </div>
      );

      // Loading the videos
    } else if (fetching) {
      return (
        <div className="library-block__loading">
          <Loader />
        </div>
      );
    }
    // Show up the videos if loaded
    else if (libraryVideos.length > 0 && !fetching) {
      return libraryVideos.map((item, index) => {
        return <VideoItem key={index} {...item} deleteVideo={deleteVideo} />;
      });

      //Error if exists
    } else if (error) {
      return (
        <div className="library-block__error">
          <span>{error.toString()}</span>
        </div>
      );
    }
  };

  return (
    <div className="library-block" id="libId">
      <h1>Library</h1>
      {renderList(libraryVideos, fetching, error)}
    </div>
  );
};

// Get data from the store
const mapStateToProps = (state) => {
  return {
    fetching: state.library.fetching,
    libraryVideos: state.library.libraryVideos,
    error: state.library.error,
  };
};

export default connect(mapStateToProps, actions)(LibraryBlock);
