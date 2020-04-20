import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const VideoItem = (props) => {
  // Local saved status state
  const [savedState, setSavedState] = useState(props.isInLibrary);

  // Getting useful data from props to form a library video
  const libraryProps = _.pick(props, [
    'id',
    'title',
    'thumbnail',
    'publishedAt',
    'channel',
  ]);

  const {
    id,
    title,
    publishedAt,
    thumbnail,
    channel,
    addVideoToLibrary,
    deleteVideo,
  } = props;
  return (
    <div className="video-item">
      <a href={'https://www.youtube.com/watch?v=' + id} target="_blanck">
        <div className="video-item__img">
          <div className="video-item__duration">{getYear(publishedAt)}</div>

          <div className="video-item__overlay-container">
            <img src={thumbnail} alt={title} />
            <div className="video-item__overlay-middle">
              <div className="video-item__overlay-text">
                <i className="fa fa-youtube"></i> {channel}
              </div>
            </div>
          </div>
        </div>
      </a>
      <div className="video-item__title">
        <span>{title}</span>
      </div>
      <div className="video-item__action">
        {savedState ? (
          <button
            className="video-item__icon-btn video-item__add-btn"
            onClick={() => {
              deleteVideo(id);
              setSavedState(false);
            }}
          >
            <div className="video-item__btn-txt">Delete</div>
          </button>
        ) : (
          <button
            className="video-item__icon-btn video-item__add-btn"
            onClick={() => {
              // Dispatching an add video action creater with video data
              addVideoToLibrary({ ...libraryProps, isInLibrary: true });
              setSavedState(true);
            }}
          >
            <div className="video-item__add-icon"></div>
            <div className="video-item__btn-txt">Save</div>
          </button>
        )}
      </div>
    </div>
  );
};

VideoItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  channel: PropTypes.string.isRequired,
  addVideoToLibrary: PropTypes.func,
  deleteVideo: PropTypes.func.isRequired,
};

function getYear(d) {
  const vDate = new Date(d);
  return vDate.getFullYear();
}

export default VideoItem;
