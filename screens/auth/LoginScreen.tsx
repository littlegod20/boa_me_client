import { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/types";
import { useLoginMutation } from "../../hooks/useAuth";
import { fonts } from "../../constants/theme";

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>

type Props = {
    navigation: LoginScreenNavigationProp
}

export default function LoginScreen({navigation}: Props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { mutate, isPending, error} = useLoginMutation()
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        mutate({email, password})
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Boame</Text>
            <View style={styles.form}>
                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Email address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        textContentType="emailAddress"
                    />
                </View>
                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordRow}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            autoCorrect={false}
                            textContentType="password"
                        />
                        <Text
                            style={styles.togglePassword}
                            onPress={() => setShowPassword(prev => !prev)}
                            accessibilityRole="button"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </Text>
                    </View>
                </View>
                {error && <Text style={styles.error}>{error.message}</Text>}
                <Button
                    title={isPending ? "Logging in..." : "Login"}
                    onPress={handleLogin}
                    disabled={isPending}
                />
            </View>
            <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
                Don't have an account? Register
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontFamily: fonts.logo,
        marginBottom: 8,
        color: '#93c5fd',
    },
    form: {
        width: '100%',
        fontFamily: fonts.regular,
        maxWidth: 448,
        gap: 24,
    },
    fieldGroup: {
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
        color: '#374151',
    },
    input: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    passwordRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    togglePassword: {
        marginLeft: 8,
        color: '#3b82f6',
    },
    error: {
        color: '#ef4444',
        fontSize: 14,
        marginTop: 4,
    },
    registerLink: {
        color: '#3b82f6',
        marginTop: 24,
    },
});
