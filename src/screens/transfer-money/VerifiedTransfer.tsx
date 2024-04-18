import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VerifiedTransfer = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Virement veerifiee</Text>
            <Text style={styles.text}>Details de virement</Text>
            <Text style={styles.text}>Virement a </Text>
            <Text style={styles.text}>Foulen </Text>
            <View>
                <View>
                    <Text>Date de virement:</Text>
                    <Text>date</Text>
                </View>
                <View>
                    <Text>Montant:</Text>
                    <Text>montant</Text>
                </View>
                <View>
                    <Text>Motif:</Text>
                    <Text>montant</Text>
                </View>
                <View>
                    <Text>Etat de virement:</Text>
                    <Text>etat</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default VerifiedTransfer;