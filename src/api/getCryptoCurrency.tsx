import axios from "axios";

import { API_URL_BASE } from '@env';
import { CryptoCurrency, Datum } from '../interfaces/types';

const endpoint = `${API_URL_BASE}/top/mktcapfull?limit=10&tsym=USD`;

export const getCryptoCurrency = async (): Promise<Datum[]> => {
    try {
        const resp = await axios.get<CryptoCurrency>(endpoint);

        const { Data } = await resp.data;
        return Data;

    } catch (err) {
        console.log(err)
        const Data: Datum[] = [];
        return Data;
    }
}
