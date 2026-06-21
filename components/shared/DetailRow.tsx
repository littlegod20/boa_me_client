import { StyleSheet, Text, View } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import { fonts, spacing, typography } from "../../constants/theme"


type DetailRowProps = {
    icon: React.ReactNode
    label: string
    value?: string | number
    isLast?: boolean
}

export function DetailRow({ icon, label, value, isLast }: DetailRowProps) {
    const { colors } = useTheme()
    return (
        <View style={[styles.detailRow, !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
            <View style={styles.detailIcon}>{icon}</View>
            <View style={styles.detailContent}>
                <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>{label}</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>{value ?? '—'}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        paddingVertical: spacing.md,
    },
    detailIcon: {
        width: 24,
        alignItems: 'center',
    },
    detailContent: {
        flex: 1,
        gap: spacing.xs,
    },
    detailLabel: {
        fontSize: typography.sizes.sm,
        fontFamily: fonts.regular,
    },
    detailValue: {
        fontSize: typography.sizes.md,
        fontFamily: fonts.medium,
    },
})