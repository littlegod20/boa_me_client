import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { LogOut } from 'lucide-react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { CustomerTabParamList } from '../../navigation/types'
import { useAuthStore } from '../../store/authStore'
import { useTheme } from '../../context/ThemeContext'
import ScreenContainer from '../../components/shared/ScreenContainer'
import ScreenHeader from '../../components/shared/ScreenHeader'
import { borderRadius, fonts, spacing, typography } from '../../constants/theme'

type ProfileScreenNavigationProps = StackNavigationProp<CustomerTabParamList, 'ProfileTab'>

type Props = {
  navigation: ProfileScreenNavigationProps
}

export default function ProfileScreen({ navigation }: Props) {
  const { colors } = useTheme()
  const { logout, user } = useAuthStore()

  const handleLogout = () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log out', style: 'destructive', onPress: () => logout() },
      ],
    )
  }

  const initial = user?.name?.charAt(0).toUpperCase() ?? '?'

  return (
    <ScreenContainer>
      <ScreenHeader title='Profile' description='Manage your account' />

      <View style={styles.profileSection}>
        <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
          <Text style={[styles.avatarText, { color: colors.primary }]}>{initial}</Text>
        </View>

        <Text style={[styles.name, { color: colors.text }]}>{user?.name ?? 'Unknown user'}</Text>
        <Text style={[styles.email, { color: colors.textSecondary }]}>{user?.email}</Text>

        {user?.role && (
          <View style={[styles.rolePill, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.roleText, { color: colors.textSecondary }]}>{user.role}</Text>
          </View>
        )}
      </View>

      <View style={styles.spacer} />

      <Pressable
        onPress={handleLogout}
        style={({ pressed }) => [
          styles.logoutButton,
          { borderColor: colors.error },
          pressed && styles.pressed,
        ]}
      >
        <LogOut size={20} color={colors.error} />
        <Text style={[styles.logoutText, { color: colors.error }]}>Log out</Text>
      </Pressable>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: typography.sizes.xxl,
    fontFamily: fonts.semibold,
  },
  name: {
    fontSize: typography.sizes.lg,
    fontFamily: fonts.semibold,
  },
  email: {
    fontSize: typography.sizes.md,
    fontFamily: fonts.regular,
    marginTop: spacing.xs,
  },
  rolePill: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  roleText: {
    fontSize: typography.sizes.sm,
    fontFamily: fonts.medium,
    textTransform: 'capitalize',
  },
  spacer: {
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.sm + 4,
    minHeight: 48,
    marginBottom: spacing.lg,
  },
  logoutText: {
    fontSize: typography.sizes.md,
    fontFamily: fonts.semibold,
  },
  pressed: {
    opacity: 0.85,
  },
})
