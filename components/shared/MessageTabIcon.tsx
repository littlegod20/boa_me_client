import { StyleSheet, View } from 'react-native'
import { MessageCircle } from 'lucide-react-native'
import { useTheme } from '../../context/ThemeContext'
import { useUnreadStore } from '../../store/unreadStore'

type Props = {
    color: string
    size: number
}

export default function MessageTabIcon({ color, size }: Props) {
    const { colors } = useTheme()
    const hasUnreadMessages = useUnreadStore((state) => state.hasUnreadMessages)
    return (
        <View>
            <MessageCircle color={color} size={size} />
            {hasUnreadMessages && (
                <View
                    style={[
                        styles.dot,
                        { backgroundColor: colors.primary, borderColor: colors.background },
                    ]}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    dot: {
        position: 'absolute',
        top: -3,
        right: -4,
        width: 11,
        height: 11,
        borderRadius: 6,
        borderWidth: 1.5,
    },
})
