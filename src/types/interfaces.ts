export interface IWordData {
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



export type State = {
    words: IWordData[],
    currentGroup: number,
    currentPage: number,
    searchTitle: string
}

export enum ROUTE {
    HOME = '/',
    BOOKS = '/books/',
    BOOK_GROUP = '/books/:groupId/',
    GROUP_PAGE = '/books/:groupId/pages/:pageId',
    GAMES = `/games/`,
    GAME = '/games/:gameId',
    STAT = '/statistics',
    TEAM = '/team'
}

export enum GROUP_PAGE_ROUTE {
    USER_ACTIVITY = 'pages/:pageId/',
}

export type TArgs =
    | { path: ROUTE.HOME }
    | { path: ROUTE.BOOKS }
    | { path: ROUTE.BOOK_GROUP; params: { groupId: string } }
    | { path: ROUTE.GROUP_PAGE; params: { groupId: string, pageId: string } }
    | { path: GROUP_PAGE_ROUTE; params: { pageId: string } }
    | { path: ROUTE.GAMES }
    | { path: ROUTE.GAME; params: { gameId: string } }
    | { path: ROUTE.STAT }
    | { path: ROUTE.TEAM }

export type TArgsWithParams = Extract<TArgs, { path: any; params: any }>;