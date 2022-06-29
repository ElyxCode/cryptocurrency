import axios from "axios";

import { API_URL_BASE } from '@env';

const endpoint = `${API_URL_BASE}/pricemultifull?`


export const getCryptoQuote = async (currency: string, cryptoCurrency: string) => {

    try {
        const resp = await axios.get(`${endpoint}fsyms=${cryptoCurrency}&tsyms=${currency}`);
        const { DISPLAY } = resp.data;
        return DISPLAY;
    } catch (error) {
        console.log(error)
        console.log('Erro: cannot recovery crypto quote')
    }

}
