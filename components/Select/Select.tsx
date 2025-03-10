import { View, Text } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SelectProps } from "./SelectProps";
import styles from "./Styles";
import { useEffect, useState } from "react";

export default function Select({
  label,
  placeholder,
  data,
  obrigatorio = false,
  style,
  onSelect,
  value,
  errorTxt = null,
}: SelectProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null)

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setIsValid(true)
    } else {
      setIsValid(obrigatorio ? false : null)
    }
  }, [value, obrigatorio])

  return (
    <View style={style}>
      <View style={styles.textLabelContainer}>
        <Text style={styles.label}>{label}</Text>
        {obrigatorio ? (
          <Text style={styles.obrigatorio}> obrigatório</Text>
        ) : undefined}
      </View>
      <View style={[styles.selectContainer, errorTxt && styles.selectContainerError, isValid && styles.selectContainerValid]}>
        <SelectDropdown
          data={data}
          onSelect={(selectedItem) => {
            onSelect?.(selectedItem)
            setIsValid(true)
          }}
          renderButton={(selectedItem, isOpened) => {
            const currentItem = data.find(item => item.value === value)
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text
                  style={[
                    styles.dropdownButtonTxtStyle,
                    !currentItem && styles.placeholder,
                  ]}
                >
                  {(currentItem && currentItem.title) || placeholder}
                </Text>
                <MaterialCommunityIcons
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color="#000000"
                  size={24}
                />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={[
                  styles.dropdownItemStyle,
                  isSelected && styles.selectedItem,
                ]}
              >
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </View>
      {errorTxt && !isValid && (
        <Text style={styles.errorTxt}>{errorTxt}</Text>
      )}
    </View>
  );
}