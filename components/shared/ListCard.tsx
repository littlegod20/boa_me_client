import { Pressable, Text, StyleSheet, PressableProps, StyleProp, ViewStyle } from 'react-native'
import { useTheme } from '../../context/ThemeContext'
import { fonts, typography, spacing, borderRadius } from '../../constants/theme'

type Props = PressableProps & {
    title: string
    subtitle?: string
}

export default function ListCard({ title, subtitle, ...props }: Props) {
    const { colors } = useTheme()
    return (
        <Pressable
            {...props}
            style={[
                styles.card, 
                { backgroundColor: colors.surface, borderColor: colors.border}, props.style as StyleProp<ViewStyle> || {}
            ]}
        >
            <Text style={[styles.name, { color: colors.text }]}>{title}</Text>
            {subtitle && (
                <Text style={[styles.desc, { color: colors.textSecondary }]} numberOfLines={2}>
                    {subtitle}
                </Text>
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        marginBottom: spacing.sm,
    },
    name: {
        fontSize: typography.sizes.lg,
        fontFamily: fonts.semibold,
    },
    desc: {
        fontSize: typography.sizes.sm,
        fontFamily: fonts.regular,
        marginTop: spacing.xs,
    },
})