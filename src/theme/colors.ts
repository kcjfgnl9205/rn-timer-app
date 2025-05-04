import { ColorSchemeName } from 'react-native'

export const getColors = (scheme: ColorSchemeName) => {
  return scheme === 'dark'
    ? {
        background: '#030712',
        container: '#1E2938',
        border: '#334155',
        text: '#ffffff',
        subText: '#697282',
        disabled: '#3F4A5A',
      }
    : {
        background: '#ffffff',
        container: '#ffffff',
        border: '#E2E8F0',
        text: '#111828',
        subText: '#98A1AE',
        disabled: '#D1D5DB',
      }
}
