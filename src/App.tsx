import { useEffect } from 'react'
import { Appearance } from 'react-native'
import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import RootStackNavigator from '@/navigation/RootStackNavigator'
import { useSettingsStore } from '@/stores/useSettingsStore'

export default function App() {
  const setColorScheme = useSettingsStore((s) => s.setColorScheme)
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme)
    })
    return () => listener.remove()
  }, [])

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
