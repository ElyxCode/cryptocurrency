import axios from "axios";
import { CryptoCurrency, Datum } from '../interfaces/types';

const baseUrl = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

export const getCryptoCurrency = async (): Promise<Datum[]> => {
    try {
        const resp = await axios.get<CryptoCurrency>(baseUrl);

        const { Data } = await resp.data;
        return Data;

    } catch (err) {
        console.log(err)
        const Data: Datum[] = [];
        return Data;
    }

}
