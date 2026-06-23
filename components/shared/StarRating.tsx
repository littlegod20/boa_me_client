import { View, Pressable, StyleSheet } from 'react-native'
import { StarIcon } from 'lucide-react-native'
import { useTheme } from '../../context/ThemeContext'
import { spacing } from '../../constants/theme'

type StarRatingProps = {
    rating: number
    onRatingChange?: (val: number) => void
    size?: number
    readOnly?: boolean
}

const StarRating = ({ rating, onRatingChange, size = 28, readOnly = false }: StarRatingProps) => {
    const { colors } = useTheme()
    return (
        <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Pressable key={star} onPress={() => !readOnly && onRatingChange?.(star)}>
                    <StarIcon
                        size={size}
                        color={colors.warning}
                        fill={star <= rating ? colors.warning : 'transparent'}
                    />
                </Pressable>
            ))}
        </View>
    )
}


const styles = StyleSheet.create({
    starsContainer:{
        display:'flex',
        flexDirection:'row',
        gap:spacing.md,
        alignContent:'center'
    }
})

export default StarRating