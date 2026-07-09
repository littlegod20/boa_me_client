import { Image, Pressable, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { useAuthStore } from '../../store/authStore'
import { useTheme } from '../../context/ThemeContext'
import { fonts, typography } from '../../constants/theme'

type ProfileNavigation = NavigationProp<{ ProfileTab: undefined }>

type Props = {
    avatarUri?: string | null
    size?: number
    style?: StyleProp<ViewStyle>
}

export default function ProfileHeaderButton({ avatarUri, size = 44, style }: Props) {
    const { colors } = useTheme()
    const navigation = useNavigation<ProfileNavigation>()
    const user = useAuthStore((state) => state.user)

    const initial = user?.name?.charAt(0).toUpperCase() ?? '?'
    const dimensions = { width: size, height: size, borderRadius: size / 2 }

    return (
        <Pressable
            onPress={() => navigation.navigate('ProfileTab')}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Open profile"
            style={[styles.base, dimensions, { borderColor: colors.border }, style]}
        >
            {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={dimensions} />
            ) : (
                <Text
                    style={[
                        styles.initial,
                        { color: colors.primary, backgroundColor: colors.primary + '20' },
                        dimensions,
                        { lineHeight: size },
                    ]}
                >
                    {initial}
                </Text>
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    base: {
        overflow: 'hidden',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    initial: {
        textAlign: 'center',
        fontSize: typography.sizes.lg,
        fontFamily: fonts.semibold,
    },
})
