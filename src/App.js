import React from 'react';
import './App.css';
import SearchBlock from './components/SearchBlock';
import LibraryBlock from './components/LibraryBlock';


function App() {
 // const { fetching, videos, onRequestTrendVideos, error } = props;

  return (
    <div className="App">
      <LibraryBlock />
<SearchBlock />
    </div>
  );
}
/*
const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    videos: state.videos,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestTrendVideos: () => dispatch({ type: types.API_CALL_REQUEST })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
*/
export default App;