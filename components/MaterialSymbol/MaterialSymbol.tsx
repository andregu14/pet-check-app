import { Text, View } from "react-native";

type MaterialSymbolProps = {
  name: "home" | "settings" | "add";
  size: number;
  color?: string;
  filled?: boolean;
};

export default function MaterialSymbol({
  name,
  size,
  color,
  filled = false,
}: MaterialSymbolProps) {
  const iconMap = {
    home: 0xe88a,
    settings: 0xe8b8,
    add: 0xe147,
  };

  const fontFamily = !filled ? "MaterialSymbols" : "MaterialSymbolsFilled";

  return (
    <View style={{ width: size, height: size }}>
      <Text
        style={{
          fontFamily: fontFamily,
          fontSize: size,
          color: color,
        }}
      >
        {String.fromCharCode(iconMap[name])}
      </Text>
    </View>
  );
}
