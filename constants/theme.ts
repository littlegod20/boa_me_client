export const lightColors = {
    primary: '#0E7E7E',
    primaryLight: '#5BBFBF',
    primaryDark: '#085858',
    secondary: '#C0622A',
    background: '#FDFAF6',
    surface: '#F5EFE7',
    text: '#1C1410',
    textSecondary: '#7A6A58',
    border: '#DDD3C5',
    error: '#D94040',
    success: '#2E8C5A',
    warning: '#D97B06',
}

export const darkColors = {
    primary: '#5BBFBF',
    primaryLight: '#0E7E7E',
    primaryDark: '#085858',
    secondary: '#E07840',
    background: '#0F1412',
    surface: '#1A2220',
    text: '#F0EDE8',
    textSecondary: '#9AA8A6',
    border: '#2A3A38',
    error: '#F06060',
    success: '#4CAF7D',
    warning: '#F0A030',
}

export type AppColors = typeof lightColors

export const fonts = {
    logo: 'Abres',
    regular: 'Montserrat-Regular',
    medium: 'Montserrat-Medium',
    semibold: 'Montserrat-SemiBold',
}

export const typography = {
    sizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 24,
        xxl: 32,
    },
    weights: {
        regular: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
    }
}

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
}

export const borderRadius = {
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
}