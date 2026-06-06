import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "../store/authStore";

export default function CustomerNavigator() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Customer Home</Text>
            <Button title="Sign Out" onPress={() => {
                console.log('Signing out')
                console.log('Zustand token in customer navigator:', useAuthStore.getState().token)
                AsyncStorage.clear()
                useAuthStore.getState().logout()
            }} />

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
