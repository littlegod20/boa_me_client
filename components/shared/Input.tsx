import { useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { borderRadius, colors, fonts, typography } from "../../constants/theme";
import {Eye, EyeClosed} from 'lucide-react-native'
import PhoneInput, { PhoneInputProps } from "react-native-phone-number-input";

export type InputProps = TextInputProps & {
    label: string
    error?: string
}

export type BoamePhoneInputProps = PhoneInputProps & {
    label: string
    error?: string
    onChangeFormattedText: (text: string) => void
}

export function BoamePhoneInput({label, error, onChangeFormattedText, ...props}: BoamePhoneInputProps) {
    return (
        <View style={styles.fieldGroup}>
            <Text style={styles.label}>{label}</Text>
            <PhoneInput
                defaultCode="GH"
                layout="first"
                placeholder="Enter your phone number"
                onChangeFormattedText={onChangeFormattedText}
                containerStyle={styles.phoneContainer}
                textContainerStyle={styles.phoneTextContainer}
                textInputStyle={styles.phoneTextInput}
                codeTextStyle={styles.phoneCodeText}
                flagButtonStyle={styles.flagHidden}
                {...props}
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}

export default function BoameInput({label, error, style, ...props}: InputProps) {
    return (
        <View style={styles.fieldGroup}>
            <Text style={styles.label}>{label}</Text>
            <TextInput {...props} style={[styles.input, style]} />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}

export function ToggleInput({label, error, style, ...props}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View style={styles.fieldGroup}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.passwordRow}>
                <TextInput
                    {...props}
                    style={[styles.passwordInput, style]}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                    style={styles.togglePassword}
                    onPress={() => setShowPassword(prev => !prev)}
                    accessibilityRole="button"
                >
                    {showPassword 
                        ? <EyeClosed color={colors.primary} size={20} /> 
                        : <Eye color={colors.primary} size={20} />
                    }
                </TouchableOpacity>
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}




const styles = StyleSheet.create({
    fieldGroup: {
        marginBottom: 12,
    },
    label: {
        fontSize: typography.sizes.sm,
        fontFamily: fonts.regular,
        marginBottom: 4,
        color: colors.primary,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: borderRadius.lg,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontFamily: fonts.regular,
    },
    passwordRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: borderRadius.lg,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    passwordInput: {
        flex: 1,
        fontFamily: fonts.regular,
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    togglePassword: {
        marginLeft: 8
    },
    error: {
        color: colors.error,
        fontSize: typography.sizes.xs,
        marginTop: 4,
    },

    phoneContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: borderRadius.lg,
        backgroundColor: colors.background,
    },
    phoneTextContainer: {
        borderRadius: borderRadius.lg,
        backgroundColor: colors.background,
        paddingVertical: 0,
    },
    phoneTextInput: {
        fontFamily: fonts.regular,
        fontSize: typography.sizes.md,
        color: colors.text,
        height: 42,
    },
    phoneCodeText: {
        fontFamily: fonts.regular,
        fontSize: typography.sizes.md,
        color: colors.text,
    },
    flagHidden: {
        width: 0,
        // opacity: 0,
    },
})