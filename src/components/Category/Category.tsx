import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IWordData } from '../../models/WordModel';
import { getWords } from '../../services/WordsService';
import { WordsList } from '../WordsList';

type State = {
    words?: IWordData[],
    currentGroup: number,
    currentPage: number,
}
const initialState: State = {
    words: [],
    currentGroup: 0,
    currentPage: 0
}

const Category: React.FC = () => {
    const [state, setState] = useState(initialState);
    const { groupId, pageId } = useParams();
    console.log(`Category: group: ${groupId}; page: ${pageId}`)

    useEffect(() => {
        getWords(groupId ? +groupId : 0, pageId ? +pageId : 0).then(
            (response) => {
                if (response) {
                    console.log(response)
                    setState({ words: response, currentGroup: groupId ? +groupId : 0, currentPage: pageId ? +pageId : 0 });
                }

            },
            (error: any) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                console.log(_content)
            }
        );
    }, []);


    return (
        <div className="list row">
            {WordsList(state.words ? state.words : [])}
        </div>
    );
}

export default Category;