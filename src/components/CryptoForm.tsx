import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { CryptoFormModel, Datum } from '../interfaces/types';
import { getCryptoCurrency } from '../api/getCryptoCurrency';

interface Props {
    currency: string;
    cryptoCurrency: string;
    onChange: (value: string, field: keyof CryptoFormModel) => void;
    setDoCallApi: React.Dispatch<React.SetStateAction<boolean>>
}

export const CryptoForm = ({ currency, cryptoCurrency, onChange, setDoCallApi }: Props) => {

    const [topCrypto, setTopCrypto] = useState<Datum[]>([]);

    useEffect(() => {

        const getListCryptoInfo = async () => {
            const Data = await getCryptoCurrency();

            if (Data.length === 0) {
                return setTopCrypto([]);
            }

            Data.map((itemValue) => {
                setTopCrypto(topCrypto =>
                    [...topCrypto, itemValue]
                )
            })
        }

        getListCryptoInfo();

    }, [])


    const handleCurrency = (itemValue: string) => {
        onChange(itemValue, 'currency');
    }

    const handleCryptoCurrency = (itemValue: string) => {
        onChange(itemValue, 'cryptoCurrency');
    }

    const quotePrice = () => {
        if ([currency, cryptoCurrency].includes('')) {
            return Alert.alert('CryptoApp', 'You must select a currency and a cryptocurrency for the quote', [{
                text: 'Ok'
            }])
        }

        setDoCallApi(true);

    }

    return (
        <View>
            <Text style={styles.textLabel}>Currency</Text>

            <Picker
                selectedValue={currency}
                onValueChange={(itemValue) => {
                    handleCurrency(itemValue)
                }}
            >
                <Picker.Item label='-- Select --' value='' />
                <Picker.Item label='US Dollar' value='USD' />
                <Picker.Item label='Mexican peso' value='MXN' />
                <Picker.Item label='Euro' value='EUR' />
                <Picker.Item label='Pound sterling' value='GBP' />
            </Picker>

            <Text style={styles.textLabel}>Cryptocurrency</Text>

            <Picker
                selectedValue={cryptoCurrency}
                onValueChange={(itemValue) => {
                    handleCryptoCurrency(itemValue)
                }}
            >
                <Picker.Item label={topCrypto.length !== 0 ? '-- Select --' : ' No data available'} value='' />

                {
                    topCrypto.length !== 0 &&
                    topCrypto.map(({ CoinInfo }, index) => (
                        <Picker.Item label={CoinInfo.FullName} value={CoinInfo.Name} key={CoinInfo.Id} />

                    ))
                }

            </Picker>

            <TouchableHighlight
                style={styles.btnQuote}
                onPress={() => quotePrice()}
            >
                <Text style={styles.labelQuote}>Quote</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    textLabel: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20
    },
    btnQuote: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        marginHorizontal: 10,

    },
    labelQuote: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase'
    }
});