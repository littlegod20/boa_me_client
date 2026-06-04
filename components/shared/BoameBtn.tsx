import {
    ActivityIndicator,
    Pressable,
    PressableProps,
    StyleSheet,
    Text,
    ViewStyle,
} from "react-native";
import { borderRadius, colors, fonts, spacing, typography } from "../../constants/theme";

type Variant = "primary" | "secondary" | "outline";

export type BoameBtnProps = Omit<PressableProps, "children"> & {
    title: string;
    variant?: Variant;
    loading?: boolean;
    fullWidth?: boolean;
};

export default function BoameBtn({
    title,
    variant = "primary",
    loading = false,
    disabled = false,
    fullWidth = true,
    style,
    ...props
}: BoameBtnProps) {
    const isDisabled = disabled || loading;

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: isDisabled, busy: loading }}
            disabled={isDisabled}
            style={({ pressed }) => [
                styles.base,
                fullWidth && styles.fullWidth,
                variantStyles[variant],
                isDisabled && styles.disabled,
                pressed && !isDisabled && styles.pressed,
                style as ViewStyle,
            ]}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === "outline" ? colors.primary : colors.background}
                    size="small"
                />
            ) : (
                <Text style={[styles.label, labelStyles[variant]]}>{title}</Text>
            )}
        </Pressable>
    );
}

const variantStyles = StyleSheet.create({
    primary: {
        backgroundColor: colors.primary,
    },
    secondary: {
        backgroundColor: colors.secondary,
    },
    outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.primary,
    },
});

const labelStyles = StyleSheet.create({
    primary: {
        color: colors.background,
    },
    secondary: {
        color: colors.background,
    },
    outline: {
        color: colors.primary,
    },
});

const styles = StyleSheet.create({
    base: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: borderRadius.lg,
        paddingVertical: spacing.sm + 4,
        paddingHorizontal: spacing.md,
        minHeight: 48,
    },
    fullWidth: {
        width: "100%",
    },
    label: {
        fontSize: typography.sizes.md,
        fontFamily: fonts.semibold,
    },
    pressed: {
        opacity: 0.85,
    },
    disabled: {
        opacity: 0.5,
    },
});
