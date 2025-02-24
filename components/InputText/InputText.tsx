import { View, TextInput, Text, TouchableOpacity } from "react-native";
import styles from "./Styles";
import { InputTextProps } from "./InputTextProps";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function InputText({
  label,
  placeholder,
  password,
  style,
  obrigatorio = false,
  date,
  ...props
}: InputTextProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState("");

  const renderPasswordIcon = () => {
    if (!password) return null;

    return (
      <TouchableOpacity
        style={{ paddingRight: 10 }}
        onPress={() => setShowPassword(!showPassword)}
      >
        <MaterialCommunityIcons
          name={showPassword ? "eye-outline" : "eye-off-outline"}
          size={24}
          color={isFocused ? "black" : "#D9D9D9"}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={style}>
      <View style={styles.textInputContainer}>
        <View style={styles.textLabelContainer}>
          <Text style={styles.textInputLabel}>{label}</Text>
          {obrigatorio && (
            <Text style={styles.textLabelObrigatorio}>obrigatório</Text>
          )}
        </View>

        <View
          style={[
            styles.textInputInnerContainer,
            (isFocused || props.isfocused) &&
              styles.textInputInnerContainerFocused,
          ]}
        >
          <TextInput
            style={[
              styles.textInput,
              { flex: 1 },
              // Aplica estilo apenas quando:
              // - É um campo de senha
              // - A senha está oculta
              // - Há texto digitado
              password &&
                !showPassword &&
                value !== "" && {
                  fontWeight: "bold",
                },
            ]}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            secureTextEntry={password && !showPassword}
            onChangeText={setValue}
            value={value}
            {...props}
          />
          {renderPasswordIcon()}
        </View>
      </View>
    </View>
  );
}
