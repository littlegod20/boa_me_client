import { StyleSheet, Text, View } from 'react-native'
import { MessageCircle } from 'lucide-react-native'
import ScreenContainer from '../../components/shared/ScreenContainer'
import { useTheme } from '../../context/ThemeContext'
import { fonts, spacing, typography } from '../../constants/theme'

const ChatScreen = () => {
  const { colors } = useTheme()

  return (
    <ScreenContainer>
      <View style={styles.centered}>
        <View style={[styles.iconCircle, { backgroundColor: colors.primary + '20' }]}>
          <MessageCircle size={40} color={colors.primary} />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>Coming soon</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          In-app messaging with your providers is on the way.
        </Text>
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontFamily: fonts.semibold,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    fontFamily: fonts.regular,
    textAlign: 'center',
  },
})

export default ChatScreen
