import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View, ActivityIndicator } from 'react-native'

import { useForm } from './hooks/useForm';
import { getCryptoQuote } from './api/getCryptoQuote';
import { Header } from './components/Header';
import { CryptoForm } from './components/CryptoForm';
import { Quotation } from './components/Quotation';
import { CryptoFormModel, CurrencyExchange } from './interfaces/types';


export const CryptoApp = () => {

    const { onChange, currency, cryptoCurrency } = useForm<CryptoFormModel>({
        currency: '',
        cryptoCurrency: ''
    });

    const [doCallApi, setDoCallApi] = useState<boolean>(false)
    const [cryptoResult, setCryptoResult] = useState<CurrencyExchange>({} as CurrencyExchange);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (doCallApi) {
            setLoading(true);
            const getQuote = async () => {
                const data = await getCryptoQuote(currency, cryptoCurrency);
                const result = data[cryptoCurrency][currency];

                setCryptoResult(result);

                setDoCallApi(false)
                setLoading(false);
            }

            getQuote();

        }

        console.log('consulta api', cryptoResult);
    }, [doCallApi])

    const ShowQuote = loading ? <ActivityIndicator color='#5E49E2' size='large' /> : <Quotation cryptoResult={cryptoResult} />;


    return (
        <>
            <Header />

            <Image
                style={styles.cryptoBanner}
                source={require('../assets/img/cryptomonedas.png')}
            />

            <View style={styles.container}>

                <CryptoForm
                    currency={currency}
                    cryptoCurrency={cryptoCurrency}
                    onChange={onChange}
                    setDoCallApi={setDoCallApi}
                />

            </View>

            <View style={{ marginTop: 40 }}>
                {
                    ShowQuote
                }
            </View>

        </>
    )
}


const styles = StyleSheet.create({
    container: {
        marginHorizontal: '2.5%',
    },
    cryptoBanner: {
        height: 150,
        width: '100%',
        marginHorizontal: '2.5%'
    }
});