
import { useEffect, useState } from "react";
import { getWords } from '../services/wordsService';
import { State } from 'types/interfaces';
import { WordsList } from '../shared/WordsList/Wordslist';
import React from 'react';
import { useParams } from 'react-router-dom';
const initialState:State={
    words:[],
    currentGroup:0,
    currentPage:0,
    searchTitle:''
}

const Words: React.FC = () => {
    const [state, setState] = useState(initialState);
    const {groupId,pageId}=useParams();

    useEffect(() => {
       getWords(groupId?+groupId-1:0).then(
            (response) => {
                if (response) {
                    setState({words:response,currentGroup:groupId?+groupId:0,currentPage:pageId?+pageId:0,searchTitle:''});
                }

            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
            }
        );
    }, []);


    return (
        <div className="list row">
            {WordsList(state.words)}
        </div>
    );
}

export default Words;
