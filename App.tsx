import { QueryClient, QueryClientProvider} from "@tanstack/react-query"
import RootNavigator from './navigation';
import { useFonts } from 'expo-font';
import { fonts } from "./constants/theme";
import { useEffect } from "react";
// import * as SplashScreen from 'expo-splash-screen';

const queryClient = new QueryClient()

export default function App() {
  const [fontsLoaded] = useFonts({
    [fonts.logo]: require('./assets/fonts/Abres.ttf'),
    [fonts.regular]: require('./assets/fonts/Montserrat-Regular.ttf'),
    [fonts.medium]: require('./assets/fonts/Montserrat-Medium.ttf'),
    [fonts.semibold]: require('./assets/fonts/Montserrat-SemiBold.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded) {
      // SplashScreen.hideAsync()
      console.log('Fonts loaded')
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null;
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator/>
    </QueryClientProvider>
  );
}