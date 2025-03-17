import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
import { useState } from "react";

type PetCardProps = {
  name: string;
  raca: string;
  image?: string | undefined;
  description: string | undefined;
  idade?: number;
  sexo?: string;
}

export default function PetCard(props: PetCardProps) {
  const [imageError, setImageError] = useState(false);
  
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image 
          style={styles.imageContainer} 
          source={props.image && !imageError ? { uri: props.image } : require('./assets/placeholder-pet.png')}
          onError={() => setImageError(true)}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.txtName}>{props.name}</Text>
          <Text style={styles.txtRaca}>{props.raca}</Text>
        </View>
        
        {(props.idade || props.sexo) && (
          <View style={styles.detailsContainer}>
            {props.idade && <View style={styles.badge}><Text style={styles.badgeText}>{props.idade} anos</Text></View>}
            {props.sexo && <View style={styles.badge}><Text style={styles.badgeText}>{props.sexo}</Text></View>}
          </View>
        )}
      </View>
      
      <View style={styles.separator} />
      
      <View style={styles.txtContainer}>
        <Text style={styles.description}>
          {props.description || "Sem descrição disponível"}
        </Text>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.moreInfo}>Saiba mais</Text>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = Math.min(width * 0.85, 320);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 'auto',
    width: cardWidth,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#E0E0E0",
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  infoContainer: {
    padding: 16,
    alignItems: "center",
  },
  imageContainer: {
    height: 140,
    width: 140,
    borderRadius: 70,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#F8F8F8",
  },
  nameContainer: {
    marginTop: 12,
    alignItems: "center",
  },
  txtName: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
  txtRaca: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  detailsContainer: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "center",
  },
  badge: {
    backgroundColor: "#F0F7FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  badgeText: {
    fontSize: 12,
    color: "#0066CC",
    fontWeight: "500",
  },
  separator: {
    height: 1,
    width: "90%",
    backgroundColor: "#EEEEEE",
    alignSelf: "center",
  },
  txtContainer: {
    padding: 16,
  },
  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    textAlign: "center",
  },
  footer: {
    backgroundColor: "#F8F8F8",
    padding: 12,
    alignItems: "center",
  },
  moreInfo: {
    color: "#0066CC",
    fontWeight: "500",
    fontSize: 14,
  }
});