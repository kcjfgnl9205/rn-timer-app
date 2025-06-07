import { useState } from 'react'
import { View, TextInput, Pressable } from 'react-native'
import Modal from 'react-native-modal'
import { getColors } from '@/theme/colors'
import { Text } from '@/components/common/Text'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { Category } from '@/types/type'
import CategoryIcon from '@/components/common/CategoryIcon'
import { CATEGORY_COLORS } from '@/consts/const'

interface CategoryCreateModalProps<T> {
  visible: boolean
  title: string
  onClose: () => void
}

export function CategoryCreateModal<T>({ visible, title, onClose }: CategoryCreateModalProps<T>) {
  const addCategory = useSettingsStore((s) => s.addCategory)
  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const colors = getColors(colorScheme)
  const [name, setName] = useState('')
  const [category, setCategory] = useState<Category>('red')

  const handleClose = () => {
    setName('')
    setCategory('red')
    onClose()
  }

  const handleSubmit = () => {
    if (!name.trim()) return // 이름이 비어있으면 무시

    addCategory(name, category)
    setName('')
    setCategory('red')
    onClose()
  }

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
          height: '90%',
        }}
        className="py-6 px-2"
      >
        <View className="flex flex-row items-center justify-between mb-8 px-4">
          <Pressable onPress={handleClose}>
            <Text className="font-semibold text-lg">닫기</Text>
          </Pressable>
          <Text className="font-semibold text-xl">{title}</Text>
          <Pressable onPress={handleSubmit}>
            <Text className="font-semibold text-lg">추가</Text>
          </Pressable>
        </View>

        <Text className="text-base mb-2 px-2">이름</Text>
        <TextInput
          className="border rounded-lg px-4 py-4 mb-8"
          style={{
            borderColor: colors.border,
            color: colors.text,
            backgroundColor: colors.container,
          }}
          placeholder="예: 공부"
          value={name}
          onChangeText={setName}
        />

        <Text className="text-base mb-2 px-2">색상</Text>
        <View className="flex flex-col gap-4">
          <View className="flex-row flex-wrap gap-4 p-4">
            {CATEGORY_COLORS.map((color, i) => (
              <View className="w-12 h-12" key={color}>
                <CategoryIcon
                  color={color}
                  selected={category === color}
                  onPress={() => setCategory(color)}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  )
}
