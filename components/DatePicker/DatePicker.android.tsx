import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import InputText from "../InputText/InputText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import styles from "./Styles";
import { DatePickerProps } from "./DatePickerProps";

export default function DatePicker({
  label,
  placeholder,
  obrigatorio = false,
  onChange,
  value,
  ...props
}: DatePickerProps) {
  const [displayValue, setDisplayValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    // se o valor for null, limpa o displayValue
    if (!value) {
      setDisplayValue("");
    } else {
      setDisplayValue(formatDate(value));
    }
  }, [value]);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("pt-BR");
  };

  const handleTextChange = (text: string) => {
    // Remove caracteres não numéricos
    let numbers = text.replace(/\D/g, "");

    // Limita a 8 dígitos (ddmmaaaa)
    numbers = numbers.substring(0, 8);

    // Formata o texto
    let formattedText = numbers;
    if (numbers.length > 2) {
      formattedText = numbers.substring(0, 2) + "/" + numbers.substring(2);
    }
    if (numbers.length > 4) {
      formattedText =
        formattedText.substring(0, 5) + "/" + formattedText.substring(5);
    }

    setDisplayValue(formattedText);

    if (numbers.length === 0) {
      onChange(null);
    }

    // Converte para data se completo
    if (numbers.length === 8) {
      const [day, month, year] = formattedText.split("/");
      const newDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day)
      );

      if (isValidDate(newDate)) {
        onChange(newDate);
      }
    }
  };

  const isValidDate = (date: Date): boolean => {
    return (
      !isNaN(date.getTime()) &&
      date.getFullYear() >= 1900 &&
      date.getFullYear() <= new Date().getFullYear()
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <InputText
          {...props}
          onPress={() => setIsFocused(true)}
          label={label}
          placeholder={placeholder}
          obrigatorio={obrigatorio}
          maxLength={10}
          value={displayValue}
          onChangeText={handleTextChange}
          inputMode="numeric"
          onBlur={() => setIsFocused(false)}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            DateTimePickerAndroid.open({
              value: value || new Date(),
              mode: "date",
              onChange: (event, selectedDate) => {
                if (event.type === "set" && selectedDate) {
                  onChange(selectedDate);
                  setDisplayValue(formatDate(selectedDate));
                }
              },
            });
          }}
        >
          <MaterialCommunityIcons
            name="calendar-blank-outline"
            size={24}
            color={isFocused ? "#black" : "#D9D9D9"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
