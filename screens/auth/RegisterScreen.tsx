import { Pressable, StyleSheet, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/types";
import { colors, fonts, spacing, typography } from "../../constants/theme";
import BoameInput, { BoamePhoneInput, ToggleInput } from "../../components/shared/Input";
import BoameBtn from "../../components/shared/BoameBtn";
import { registerSchema } from "../../validators/auth.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRegisterMutation } from "../../hooks/useAuth";
import { Role } from "../../types/auth.types";

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, "Register">;

type Props = {
    navigation: RegisterScreenNavigationProp;
};

const roleOptions = [
    { label: "Customer", value: Role.CUSTOMER },
    { label: "Provider", value: Role.PROVIDER },
] as const;

export default function RegisterScreen({ navigation }: Props) {
    const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<
        z.infer<typeof registerSchema>
    >({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: Role.CUSTOMER,
        },
    });
    const { mutate, isPending, error } = useRegisterMutation();
    const selectedRole = watch("role");

    const handleRegister: SubmitHandler<z.infer<typeof registerSchema>> = (data) => {
        mutate(data);
        // console.log(data);
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            extraScrollHeight={20}
            enableOnAndroid
        >
            <Text style={styles.title}>Create account</Text>
            <View style={styles.form}>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <BoameInput
                            label="Full name"
                            style={styles.input}
                            placeholder="Enter your name"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            autoCapitalize="words"
                            autoCorrect={false}
                            textContentType="name"
                            error={errors.name?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <BoameInput
                            label="Email address"
                            style={styles.input}
                            placeholder="Enter your email"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            textContentType="emailAddress"
                            error={errors.email?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <ToggleInput
                            label="Password"
                            style={styles.input}
                            placeholder="Create a password"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            autoCapitalize="none"
                            autoCorrect={false}
                            textContentType="newPassword"
                            error={errors.password?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="phone_number"
                    render={({ field: { onChange, value } }) => (
                       <BoamePhoneInput
                            label="Phone number"
                            onChangeFormattedText={onChange}
                            value={value}
                            error={errors.phone_number?.message}
                        />
                    )}
                />

                <View style={styles.roleGroup}>
                    <Text style={styles.roleLabel}>I am a</Text>
                    <View style={styles.roleRow}>
                        {roleOptions.map(({ label, value }) => (
                            <Pressable
                                key={value}
                                accessibilityRole="button"
                                onPress={() => setValue("role", value, { shouldValidate: true })}
                                style={[
                                    styles.roleOption,
                                    selectedRole === value && styles.roleOptionSelected,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.roleOptionText,
                                        selectedRole === value && styles.roleOptionTextSelected,
                                    ]}
                                >
                                    {label}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                    {errors.role?.message && (
                        <Text style={styles.error}>{errors.role.message}</Text>
                    )}
                </View>

                <BoameBtn
                    title="Register"
                    loading={isPending}
                    onPress={handleSubmit(handleRegister)}
                />
                {error && <Text style={styles.error}>{error.message}</Text>}
            </View>
            <Text style={styles.loginLink} onPress={() => navigation.navigate("Login")}>
                Already have an account? Login
            </Text>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: typography.sizes.xxl,
        fontFamily: fonts.logo,
        color: colors.primary,
        marginBottom: spacing.lg,
    },
    form: {
        width: "100%",
        maxWidth: 448,
        gap: 24,
    },
    input: {
        fontFamily: fonts.regular,
    },
    roleGroup: {
        marginBottom: 12,
    },
    roleLabel: {
        fontSize: typography.sizes.sm,
        fontFamily: fonts.regular,
        marginBottom: spacing.sm,
        color: colors.primary,
    },
    roleRow: {
        flexDirection: "row",
        gap: spacing.sm,
    },
    roleOption: {
        flex: 1,
        alignItems: "center",
        paddingVertical: spacing.sm + 4,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        backgroundColor: colors.surface,
    },
    roleOptionSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.primary,
    },
    roleOptionText: {
        fontSize: typography.sizes.md,
        fontFamily: fonts.medium,
        color: colors.text,
    },
    roleOptionTextSelected: {
        color: colors.background,
    },
    error: {
        color: colors.error,
        fontSize: typography.sizes.sm,
        fontFamily: fonts.regular,
        marginTop: 4,
    },
    loginLink: {
        color: colors.primary,
        marginTop: spacing.lg,
        fontFamily: fonts.regular,
    },
});
