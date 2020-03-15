import React, { useEffect, useRef } from 'react';
import VideoItem from './VideoItem';
import Loader from './Loader';
import { connect } from 'react-redux';
import * as types from '../constants/actions';
import { useDispatch } from 'react-redux';

const LibraryBlock = props => {
	const dispatch = useDispatch();
	const videoDelete = id => {
		dispatch({ type: types.API_DELETE_VIDEO_REQUEST, deleteId: id });
	};

	useEffect(() => {
		props.onRequestLibVideos();

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

	return (
		<div className="library-block" id="libId">
			<h1>Library</h1>
			{props.libVideos.items.length > 0 && !props.fetching ? (
				<>
					{props.libVideos.items.map((item, index) => {
						return (
							<VideoItem key={index} {...item} onVideoDelete={videoDelete} />
						);
					})}
				</>
			) : (
				<>
					{(props.error && (
						<div className="library-block__error">
							<span>{props.error.toString()}</span>
						</div>
					)) ||
						(props.fetching && (
							<div className="library-block__loading">
								<Loader />
							</div>
						)) ||
						(props.libVideos.items.length === 0 && !props.fetching && (
							<div className="library-block__error">
								<span>Your library is empty</span>
							</div>
						))}
				</>
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		fetching: state.libVideos.fetching,
		libVideos: state.libVideos.libVideos,
		error: state.libVideos.error,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onRequestLibVideos: () => dispatch({ type: types.API_CALL_LIB_REQUEST }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryBlock);
