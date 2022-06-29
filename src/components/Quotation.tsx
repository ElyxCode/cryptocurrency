import React from 'react'
import { Text, StyleSheet, ScrollView } from 'react-native';

import { CurrencyExchange } from '../interfaces/types';

interface Props {
    cryptoResult: CurrencyExchange
}

export const Quotation = ({ cryptoResult }: Props) => {

    if (Object.keys(cryptoResult).length === 0) return null;

    return (
        <ScrollView style={styles.container}>
            <Text style={[styles.text, styles.labelPrice]}>
                <Text style={styles.span}>{cryptoResult.PRICE}</Text>
            </Text>

            <Text style={styles.text}>Highest price of the day: {' '}
                <Text style={styles.span}>{cryptoResult.HIGHDAY}</Text>
            </Text>

            <Text style={styles.text}>Lowest price of the day: {' '}
                <Text style={styles.span}>{cryptoResult.LOWDAY}</Text>
            </Text>

            <Text style={styles.text}>Variation last 24 hours: {' '}
                <Text style={styles.span}>{cryptoResult.CHANGEPCT24HOUR} %</Text>
            </Text>

            <Text style={styles.text}>Last update: {' '}
                <Text style={styles.span}>{cryptoResult.LASTUPDATE}</Text>
            </Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5E49E2',
        padding: 20,
    },
    text: {
        color: '#FFF',
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        marginBottom: 10,
    },
    labelPrice: {
        fontSize: 38,
    },
    span: {
        fontFamily: 'Lato-Black'
    }
});
