import { JSX } from 'react'
import { FlatList, View, Pressable } from 'react-native'
import Modal from 'react-native-modal'
import Check from '@/assets/icons/check.svg'
import { getColors } from '@/theme/colors'
import { Text } from '@/components/common/Text'
import { useSettingsStore } from '@/stores/useSettingsStore'

interface Item<T> {
  label: string
  value: T
  icon?: JSX.Element
}

interface SelectModalProps<T> {
  visible: boolean
  title: string
  items: Item<T>[]
  selectedValue: T
  onSelect: (value: T) => void
  onClose: () => void
}

export function SelectModal<T>({
  visible,
  title,
  items,
  selectedValue,
  onSelect,
  onClose,
}: SelectModalProps<T>) {
  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const colors = getColors(colorScheme)

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      style={{ justifyContent: 'flex-end', margin: 0 }}
    >
      <View
        style={{
          backgroundColor: colors.container,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: '50%',
        }}
        className="py-6 px-2"
      >
        <View className="flex flex-row items-center justify-center mb-8">
          <Text className="font-semibold text-xl">{title}</Text>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => String(item.value)}
          renderItem={({ item }) => {
            const isSelected = item.value === selectedValue
            return (
              <Pressable onPress={() => onSelect(item.value)}>
                <View
                  className="flex flex-row justify-between items-center border rounded-lg p-4 mb-2"
                  style={{ borderColor: colors.border }}
                >
                  <View className="flex-row items-center gap-3">
                    {item.icon && item.icon}
                    <Text className="text-lg font-semibold">{item.label}</Text>
                  </View>

                  {isSelected && <Check width={22} height={22} color={colors.text} />}
                </View>
              </Pressable>
            )
          }}
        />
      </View>
    </Modal>
  )
}
