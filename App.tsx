import { QueryClient, QueryClientProvider} from "@tanstack/react-query"
import RootNavigator from './navigation';
import { useFonts } from 'expo-font';
import { fonts } from "./constants/theme";
import { useEffect } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "react-native";
import { SocketProvider } from "./context/SocketContext";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient()

function ThemedStatusBar() {
  const { isDark } = useTheme();
  return <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />;
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    [fonts.logo]: require('./assets/fonts/Abres.ttf'),
    [fonts.regular]: require('./assets/fonts/Montserrat-Regular.ttf'),
    [fonts.medium]: require('./assets/fonts/Montserrat-Medium.ttf'),
    [fonts.semibold]: require('./assets/fonts/Montserrat-SemiBold.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded || fontError) {
        SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

if (!fontsLoaded && !fontError) return null;

  return (
    <ThemeProvider>
      
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
          <RootNavigator/>
        </SocketProvider>
      </QueryClientProvider>

        <ThemedStatusBar />
      </ThemeProvider>
  );
}