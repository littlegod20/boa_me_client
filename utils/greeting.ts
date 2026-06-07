export const getGreeting = () => {
    const hours = new Date().getHours()
    if (hours < 12) return 'Morning'
    if (hours < 18) return 'Afternoon'
    return 'Evening'
}