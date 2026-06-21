import { StyleSheet, Text, View } from "react-native";
import { BookingStatus } from "../../types/booking.types";
import { useTheme } from "../../context/ThemeContext";
import { borderRadius, fonts, spacing, typography } from "../../constants/theme";



export default function StatusBadge({ status }: { status: BookingStatus }) {
    const { colors } = useTheme();
    
    const statusConfig: Record<BookingStatus, { label: string; color: string }> = {
        [BookingStatus.PENDING_PAYMENT]: { label: 'Pending Payment', color: colors.warning },
        [BookingStatus.PENDING_CONFIRMATION]: { label: 'Awaiting Confirmation', color: colors.warning },
        [BookingStatus.CONFIRMED]: { label: 'Confirmed', color: colors.primary },
        [BookingStatus.IN_PROGRESS]: { label: 'In Progress', color: colors.primary },
        [BookingStatus.COMPLETED]: { label: 'Completed', color: colors.success },
        [BookingStatus.CANCELLED]: { label: 'Cancelled', color: colors.error },
    }

    const { label, color } = statusConfig[status] ?? { label: status, color: colors.textSecondary }

    return (
        <View style={[styles.badge, { backgroundColor: color + '20' }]}>
        <Text style={[styles.badgeText, { color: color }]}>{label}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.lg,
    },
    badgeText: {
        fontSize: typography.sizes.sm,
        fontFamily: fonts.medium,
        textTransform: 'capitalize'
    },
    label: {
        fontSize: typography.sizes.sm,
        fontFamily: fonts.medium,
        textTransform: 'capitalize'
    },
})