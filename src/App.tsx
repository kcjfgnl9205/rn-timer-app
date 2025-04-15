import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import RootStackNavigator from '@/navigation/RootStackNavigator'

export default function App() {
  const [fontsLoaded] = useFonts({
    Pretendard: require('./assets/fonts/PretendardVariable.ttf'),
  })

  if (!fontsLoaded) return null // 폰트 로딩 안 됐을 때 빈 화면

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
