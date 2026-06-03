import { useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { colors } from "../../constants/theme";


export type InputProps = TextInputProps & {
    label: string
    error?: string
}

export default function Input({label, error, ...props}: InputProps) {
    return (
        <View style={styles.fieldGroup}>
            <Text style={styles.label}>{label}</Text>
            <TextInput {...props} style={styles.input} />
        </View>
    )
}


export function ToggleInput({label, error, ...props}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View style={styles.passwordRow}>
            <Input
                label={label}
                style={styles.passwordInput}
                {...props}
            />
            <Text
                style={styles.togglePassword}
                onPress={() => setShowPassword(prev => !prev)}
                accessibilityRole="button"
            >
                {showPassword ? 'Hide' : 'Show'}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    fieldGroup: {
        marginBottom: 12,
    },
    label: {
        fontSize: 12,
        marginBottom: 4,
        color: colors.primary,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },

    passwordRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
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
        color: colors.primary,
    },
})