import axios from "axios";
import { IWordData } from '../models/WordModel';
import { API_URL } from './AppService';


export const getWords = async (group: number = 0, page: number = 0): Promise<IWordData[]|undefined> => {

    try {
        const data = await axios.get(`${API_URL}words`, { params: { group: group, page: page } });
        console.log(data);
        return data.data;
    } catch (error) {
        console.error(error)
    };
}