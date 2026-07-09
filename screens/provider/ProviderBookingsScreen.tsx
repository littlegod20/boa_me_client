import { useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import { fonts, spacing, typography } from '../../constants/theme'
import ScreenContainer from '../../components/shared/ScreenContainer'
import ScreenHeader from '../../components/shared/ScreenHeader'
import ProfileHeaderButton from '../../components/shared/ProfileHeaderButton'
import { useTheme } from '../../context/ThemeContext'
import { useGetProviderBookings } from '../../hooks/useBooking'
import { BookingCard } from '../../components/shared/BookingCard'
import BookingStatusFilter from '../../components/shared/BookingStatusFilter'
import { BookingStatus } from '../../types/booking.types'
import { StackNavigationProp } from '@react-navigation/stack'
import { ProviderBookingsStackParamList } from '../../navigation/types'

type ProviderBookingsScreenNavigationProp = StackNavigationProp<ProviderBookingsStackParamList, 'ProviderBookings'>

type Props = {
    navigation:ProviderBookingsScreenNavigationProp
}

export default function ProviderBookingsScreen({navigation}:Props) {
    const {colors} = useTheme()
    const [statusFilter, setStatusFilter] = useState<BookingStatus | undefined>(undefined)
    const {data:bookings, isLoading, isError} = useGetProviderBookings(statusFilter)

    return (
        <ScreenContainer>
            <View style={styles.topBar}>
                <ProfileHeaderButton />
            </View>

            <ScreenHeader
            title='Customer Bookings'
            description='Track and manage your customer bookings'
            />

            <BookingStatusFilter selected={statusFilter} onSelect={setStatusFilter} />

            { isLoading ? (
                <View style={styles.centered}>
                <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : isError ? (
                <View style={styles.centered}>
                <Text style={[styles.message, { color: colors.error }]}>
                    Something went wrong while fetching your bookings
                </Text>
                </View>
            ) : (
                <FlatList
                data={bookings}
                style={styles.list}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <BookingCard
                    service_name={item.service_name}
                    provider_name={item.provider_name}
                    price={item.price}
                    scheduled_at={item.scheduled_at}
                    perspective='provider'
                    customer_name={item.customer_name}
                    customer_location={item.customer_location}
                    booking_status={item.booking_status}
                    showChevron
                    onPress={() => navigation.navigate('ProviderBookingDetail', {
                        bookingId: item.id,
                    })}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.centered}>
                    <Text style={[styles.message, { color: colors.textSecondary }]}>
                        {statusFilter ? 'No bookings match this filter' : 'No bookings from customers yet.'}
                    </Text>
                    </View>
                }
                keyExtractor={(item) => item.id}
                />
            )}
        </ScreenContainer>
      )
}

const styles = StyleSheet.create({
    topBar: {
      marginTop: spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
    },
    list: {
      flex: 1,
    },
    listContent: {
      flexGrow: 1,
      paddingBottom: spacing.xl,
    },
    centered: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.lg,
    },
    message: {
      fontSize: typography.sizes.md,
      fontFamily: fonts.regular,
      textAlign: 'center',
    },
  })