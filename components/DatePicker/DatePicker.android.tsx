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
  errorMessage,
  isValid,
  useValidation,
  ...props
}: DatePickerProps) {
  const [displayValue, setDisplayValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [localError, setLocalError] = useState("");
  const [localIsValid, setLocalIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    // se o valor for null, limpa o displayValue
    if (!value) {
      setDisplayValue("");
      setLocalIsValid(null);
      setLocalError("");
    } else {
      setDisplayValue(formatDate(value));
      setLocalIsValid(true);
      setLocalError("");
    }
  }, [value]);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("pt-BR");
  };

  const validateDateString = (dateStr: string): boolean => {
    // Se estiver vazio, consideramos como válido (não preenchido)
    if (!dateStr) return true;

    // Verifica formato DD/MM/AAAA
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return false;

    const [day, month, year] = dateStr.split("/").map(Number);

    // Validações básicas
    if (
      day < 1 ||
      day > 31 ||
      month < 1 ||
      month > 12 ||
      year < 1900 ||
      year > new Date().getFullYear()
    ) {
      return false;
    }

    // Verificar dias por mês
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    if (day > lastDayOfMonth) return false;

    // Criar objeto Date e confirmar que é uma data válida
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
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

    // Validação enquanto digita
    if (formattedText.length > 0) {
      // Se for um formato parcial, não validamos ainda
      if (formattedText.length < 10) {
        setLocalIsValid(null);
        setLocalError("");
      } else {
        // Formato completo, podemos validar
        const isDateValid = validateDateString(formattedText);
        setLocalIsValid(isDateValid);

        if (isDateValid) {
          setLocalError("");
          const [day, month, year] = formattedText.split("/").map(Number);
          const newDate = new Date(year, month - 1, day);
          onChange(newDate);
        } else {
          setLocalError("Data inválida");
          onChange(null);
        }
      }
    } else {
      // Campo vazio
      setLocalIsValid(null);
      setLocalError("");
      onChange(null);
    }
  };

  const isValidDate = (date: Date): boolean => {
    return (
      !isNaN(date.getTime()) &&
      date.getFullYear() >= 1900 &&
      date.getFullYear() <= new Date().getFullYear()
    );
  };

  const handlePickerDate = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const isValid = isValidDate(selectedDate);
      onChange(isValid ? selectedDate : null);
      setDisplayValue(isValid ? formatDate(selectedDate) : "");
      setLocalIsValid(isValid);
      setLocalError(isValid ? "" : "Data inválida");
    }
  }

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
          errorMessage={localError || errorMessage}
          useValidation={useValidation ?? true}
          isValid={isValid !== undefined ? isValid : localIsValid}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            DateTimePickerAndroid.open({
              value: value || new Date(),
              mode: "date",
              onChange: (event, selectedDate) => {
                if (event.type === "set") {
                  handlePickerDate(selectedDate);
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
