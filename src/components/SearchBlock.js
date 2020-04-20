import React, { useEffect } from 'react';
import SearchPanel from './SearchPanel';
import { connect } from 'react-redux';
import VideoItem from './VideoItem';
import Loader from './Loader';
import * as actions from '../actions';

const SearchBlock = ({
  videos,
  fetching,
  error,
  fetchStartVideos,
  fetchSearchedVideos,
  addVideoToLibrary,
  deleteVideo,
}) => {
  const defaultSearch = 'Chopin';
  // Starts fetching all videos after loading
  useEffect(() => {
    fetchStartVideos(defaultSearch);
  }, []);

  // Helping function
  const renderList = (
    videos,
    fetching,
    error,
    addVideoToLibrary,
    deleteVideo
  ) => {
    // Empty video list
    if (videos.length === 0 && !fetching) {
      return (
        <div className="search-block__error">
          <span>No videos founded</span>
        </div>
      );

      // Loading
    } else if (fetching) {
      return <Loader />;

      // Shows up the list of videos
    } else if (videos.length > 0 && !fetching) {
      return videos.map((item, index) => {
        return (
          <VideoItem
            key={index}
            {...item}
            addVideoToLibrary={addVideoToLibrary}
            deleteVideo={deleteVideo}
          />
        );
      });

      // Shows error if it exists
    } else if (error) {
      return (
        <div className="search-block__error">
          <span>{error.toString()}</span>
        </div>
      );
    }
  };

  return (
    <div className="search-block">
      <SearchPanel
        defaultSearch={defaultSearch}
        onSearch={fetchSearchedVideos}
      />
      <div className="search-block__videos">
        {renderList(videos, fetching, error, addVideoToLibrary, deleteVideo)}
      </div>
    </div>
  );
};

//Getting data from the store
const mapStateToProps = (state) => {
  return {
    fetching: state.youtube.fetching,
    videos: state.youtube.videos,
    error: state.youtube.error,
  };
};

export default connect(mapStateToProps, actions)(SearchBlock);
