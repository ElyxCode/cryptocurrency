import axios from "axios";

import { API_URL_BASE } from '@env';
import { CryptoExchange } from "../interfaces/types";

const endpoint = `${API_URL_BASE}/pricemultifull?`


export const getCryptoQuote = async (currency: string, cryptoCurrency: string) => {

    try {
        const resp = await axios.get(`${endpoint}fsyms=${cryptoCurrency}&tsyms=${currency}`);
        const { DISPLAY } = resp.data;
        return DISPLAY;
    } catch (err) {
        console.log(err)
    }

}
