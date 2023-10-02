import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Ionicons from '@expo/vector-icons/Ionicons';
import CARD_ICON from '../constants/cardIcon';
import CARD_COLOR from '../constants/cardColour';
import Toast from 'react-native-root-toast';

import {
    deviceWidth,
    deviceHeight,
    getOrientation,
    calcHeight,
    getFontSizeByWindowWidth,
    calcWidth,
} from '../helper/res'; // Replace with the correct path

function formatCardNumber(cardNumber) {
    return cardNumber
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1     ')
        .trim();
}

function maskCardNumber(cardNumber) {
    const visibleDigits = 4;
    const maskedSection = cardNumber.slice(0, -visibleDigits);
    const visibleSection = cardNumber.slice(-visibleDigits);
    return maskedSection.replace(/./g, '*') + visibleSection;
}

function getCardNumberDisplayValue(cardNumber, showFullNumber) {
    if (!showFullNumber) cardNumber = maskCardNumber(cardNumber);

    return formatCardNumber(cardNumber);
}

function Card({ item }) {
    const [showCVV, setShowCVV] = useState(false);

    const handleClipboardPress = async () => {
        Clipboard.setString(item.card_number);
        Toast.show('Card Number Copied to Clipboard', {
            duration: Toast.durations.LONG,
        });
    };

    const cardWidth = calcWidth(90); // Adjust as needed for your design

    return (
        <View
            style={{
                ...styles.card,
                backgroundColor: CARD_COLOR[item.type] || item.color,
                width: cardWidth,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Text style={styles.cardText}>{item.nickname}</Text>
                <Image
                    source={CARD_ICON[item.type]}
                    style={{ width: calcWidth(15), height: calcHeight(5) }}
                />
            </View>
            <Text style={styles.cardNumber}>
                {getCardNumberDisplayValue(item.card_number, !showCVV)}
            </Text>
            <Text style={styles.cardText}>{item.expiry}</Text>
            <View style={styles.cvvContainer}>
                {item.cvv && (
                    <Text style={styles.cardText}>
                        { item.cvv }
                    </Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: calcHeight(2),
        borderRadius: calcHeight(1),
        margin: calcHeight(1),
        elevation: 3,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        height: calcHeight(30),
    },
    cardText: {
        color: 'white',
        fontSize: getFontSizeByWindowWidth(16),
    },
    cvvContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardNumber: {
        color: 'white',
        fontSize: getFontSizeByWindowWidth(17),
        margin: calcHeight(1),
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
    },
});

export default Card;
