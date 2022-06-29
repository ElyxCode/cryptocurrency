import axios from "axios";
import { CryptoExchange } from "../interfaces/types";

const baseUrl = 'https://min-api.cryptocompare.com/data/pricemultifull?'


export const getCryptoQuote = async (currency: string, cryptoCurrency: string) => {

    try {
        const resp = await axios.get(`${baseUrl}fsyms=${cryptoCurrency}&tsyms=${currency}`);
        const { DISPLAY } = resp.data;
        return DISPLAY;
    } catch (err) {
        console.log(err)
    }

}
