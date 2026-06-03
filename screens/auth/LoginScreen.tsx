import { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/types";
import { useLoginMutation } from "../../hooks/useAuth";


type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>

type Props = {
    navigation: LoginScreenNavigationProp
}

export default function LoginScreen({navigation}: Props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { mutate, isPending, error} = useLoginMutation()
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        mutate({email, password})
        navigation.navigate('VerifyEmail', {email})
    }

    return (
        <View className="flex-1 items-center justify-center space-y-4 px-6 bg-white">
            <Text className="text-2xl font-bold mb-2">Boame</Text>
            <View className="w-full max-w-md flex-col gap-6">
                {/* Email Input */}
                <View className="mb-3">
                    <Text className="text-base mb-1 text-gray-700">Email address</Text>
                    <TextInput
                        className="border border-gray-300 rounded px-3 py-2"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        textContentType="emailAddress"
                    />
                </View>
                {/* Password Input with Toggle */}
                <View className="mb-3">
                    <Text className="text-base mb-1 text-gray-700">Password</Text>
                    <View className="flex-row items-center border border-gray-300 rounded px-3 py-2">
                        <TextInput
                            style={{ flex: 1 }}
                            className="px-0 py-0 border-none focus:border-none focus:ring-0 outline-none"
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            autoCorrect={false}
                            textContentType="password"
                        />
                        <Text
                            className="ml-2 text-blue-500"
                            onPress={() => setShowPassword(prev => !prev)}
                            accessibilityRole="button"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </Text>
                    </View>
                </View>
                {error && <Text className="text-red-500 text-sm mt-1">{error.message}</Text>}
                <Button
                    title={isPending ? "Logging in..." : "Login"}
                    onPress={handleLogin}
                    disabled={isPending}
                />
            </View>
            <Text className="text-blue-500 mt-6" onPress={() => navigation.navigate('Register')}>
                Don't have an account? Register
            </Text>
        </View>
    )
}