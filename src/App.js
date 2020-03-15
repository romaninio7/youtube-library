import React from 'react';
import './App.css';
import SearchBlock from './components/SearchBlock';
import LibraryBlock from './components/LibraryBlock';

function App() {
	return (
		<div className="App">
			<LibraryBlock />
			<SearchBlock />
		</div>
	);
}

export default App;
