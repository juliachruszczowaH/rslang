import axios from "axios";

const API_URL = "https://rs-lang-be.herokuapp.com/words?group=0&page=0";
class WordsService {
    async getAllWords() {
        try {
            const data = await axios.get(API_URL);
            console.log(data);
            return data;
        } catch (error) {
            console.error(error)
        };



    }
}

export default new WordsService();