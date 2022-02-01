
import React from 'react';
import { Component } from "react";
import { Link } from 'react-router-dom';
import WordsService from '../Services/WordsService';

interface ITutorialData {
    audio: string,
    audioExample: string,
    audioMeaning: string,
    group: number,
    id: string,
    image: string,
    page: number,
    textExample: string,
    textExampleTranslate: string,
    textMeaning: string,
    textMeaningTranslate: string,
    transcription: string,
    word: string,
    wordTranslate: string,
}

interface RouterProps { // type for `match.params`
    id: string; // must be type `string` since value comes from the URL
}

type Props = {};

type State = {
    tutorials: Array<ITutorialData>,
    currentTutorial: ITutorialData | null,
    currentIndex: number,
    searchTitle: string
}
export default class WordsList extends Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }
    componentDidMount() {
        this.retrieveTutorials();
    }
    retrieveTutorials() {
        WordsService.getAllWords()
            .then((response: any) => {
                this.setState({
                    tutorials: response.data
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    refreshList() {
        this.retrieveTutorials();
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        });
    }

    render() {
        const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;

        return (
            <div className="list row">
                
                <div className="col-md-6">
                    <h4>Tutorials List</h4>

                    <ul className="list-group">
                        {tutorials &&
                            tutorials.map((tutorial: ITutorialData, index: number) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    key={index}
                                >
                                    {tutorial.textExample}
                                </li>
                            ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentTutorial ? (
                        <div>
                            <h4>Tutorial</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentTutorial.textExample}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentTutorial.textExampleTranslate}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentTutorial.word }
                            </div>

                            <Link
                                to={"/tutorials/" + currentTutorial.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Tutorial...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
