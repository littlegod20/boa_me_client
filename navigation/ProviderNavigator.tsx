import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProviderNavigator() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Provider Home</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
