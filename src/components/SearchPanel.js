import React, { useState } from 'react';
import {useDispatch } from "react-redux";
import * as types from '../constants/actions';

const SearchPanel = (props) => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const onSearchById = () => {
        dispatch({ type: types.API_CALL_SEARCH_REQUEST, query });
        };


   
    return (
        <div className='search-block__panel'>
             <div className='search-block__search'>
             <input value={query} placeholder="Search video" type='text' onChange={(e) => {
                 setQuery(e.target.value);
            }} />
             <button onClick={onSearchById}><i className="fa fa-search"></i></button>
             </div>
        </div>
    )
}

export default SearchPanel;
