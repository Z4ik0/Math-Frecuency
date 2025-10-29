import React from "react";
import { View, StyleSheet, Image, ScrollView, Text, Linking } from "react-native";
import { Pressable } from "react-native";

export default function CreditScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../assets/WhatsApp Image 2025-10-28 at 6.38.07 AM.jpeg")}
          style={styles.backgroundimg}
        />
        <Image
          source={require("../assets/WhatsApp Image 2025-10-28 at 6.38.07 AM.jpeg")}
          style={styles.profile}
        />
        <View style={styles.Cbody}>
          <Text style={styles.title}>Azucena Hernandez B.</Text>
          <Text style={styles.subtitle}>Frontend/UI/UX</Text>
          <Text style={styles.texto }>
            Estudiante de ingenieria en Desarrollo y Gestion de Software con un
            fuerte interes y enfoque en el Desarrollo Frotend y Diseño UI/UI. Mi
            compromiso se centra en adquirir habilidades prácticas, contribuir
            con la resolución de problemas y trabajar eficazmente en proyectos
            que requieren una alta calidad visual y de interacción.
          </Text>
          <Pressable style={styles.btnmain}>
            <Text style={styles.tbtn}>azuhernadez226@gmail.com</Text>
          </Pressable>
          <View style={styles.icons}>
            <Pressable style={styles.btns} onPress={() => Linking.openURL("https://github.com/azucena123456")}>
              <Image
                source={require("../assets/github.png")}
                style={styles.icon}
              />
            </Pressable>
            <Pressable style={styles.btns} onPress={()=>Linking.openURL('https://x.com/Azucenahdz226?t=SFn7qL3jRFXSQGJ2lhYFdg&s=09')}>
              <Image source={require("../assets/x.png")} style={styles.icon} />
            </Pressable>
            <Pressable style={styles.btns} onPress={()=>Linking.openURL('https://www.linkedin.com/in/azucena-hernández-a990a22b8')}>
              <Image
                source={require("../assets/in.png")}
                style={styles.icon}
              />
            </Pressable>
          </View>
        </View>
      </View>
       <View style={styles.card}>
        <Image
          source={require("../assets/WhatsApp Image 2025-10-28 at 6.52.58 AM.jpeg")}
          style={styles.backgroundimg}
        />
        <Image
          source={require("../assets/WhatsApp Image 2025-10-28 at 6.52.58 AM.jpeg")}
          style={styles.profile}
        />
        <View style={styles.Cbody}>
          <Text style={styles.title}>Miguel Ignacio Gomez P.</Text>
          <Text style={styles.subtitle}>Frontend/UI/UX</Text>
          <Text style={styles.texto }>
            Estudiante de ingenieria en Desarrollo y Gestion de Software con un
            fuerte interes y enfoque en el Desarrollo Frotend y Diseño UI/UI. Mi
            compromiso se centra en adquirir habilidades prácticas, contribuir
            con la resolución de problemas y trabajar eficazmente en proyectos
            que requieren una alta calidad visual y de interacción.
          </Text>
          <Pressable style={styles.btnmain}>
            <Text style={styles.tbtn}>azuhernadez226@gmail.com</Text>
          </Pressable>
          <View style={styles.icons}>
            <Pressable style={styles.btns}>
              <Image
                source={require("../assets/github.png")}
                style={styles.icon}
              />
            </Pressable>
            <Pressable style={styles.btns}>
              <Image source={require("../assets/x.png")} style={styles.icon} />
            </Pressable>
            <Pressable style={styles.btns}>
              <Image
                source={require("../assets/in.png")}
                style={styles.icon}
              />
            </Pressable>
          </View>
        </View>
      </View>


       <View style={styles.card}>
        <Image
          source={require("../assets/posho.jpeg")}
          style={styles.backgroundimg}
        />
        <Image
          source={require("../assets/posho.jpeg")}
          style={styles.profile}
        />
        <View style={styles.Cbody}>
          <Text style={styles.title}>Irving Cruz Chávez</Text>
          <Text style={styles.subtitle}>Frontend/UI/UX</Text>
          <Text style={styles.texto }>
            Estudiante de ingenieria en Desarrollo y Gestion de Software con un
            fuerte interes y enfoque en el Desarrollo Frotend y Diseño UI/UI. Mi
            compromiso se centra en adquirir habilidades prácticas, contribuir
            con la resolución de problemas y trabajar eficazmente en proyectos
            que requieren una alta calidad visual y de interacción.
          </Text>
          <Pressable style={styles.btnmain}>
            <Text style={styles.tbtn}>azuhernadez226@gmail.com</Text>
          </Pressable>
          <View style={styles.icons}>
            <Pressable style={styles.btns} onPress={()=>Linking.openURL("https://github.com/CruzIrving")}>
              <Image
                source={require("../assets/github.png")}
                style={styles.icon}
              />
            </Pressable>
            <Pressable style={styles.btns} onPress={()=>Linking.openURL("https://www.instagram.com/clove_saik_/")}>
              <Image source={require("../assets/Instagram.png")} style={styles.icon} />
            </Pressable>
            <Pressable style={styles.btns} onPress={()=>Linking.openURL("https://www.linkedin.com/in/irving-cruz-ch%C3%A1vez-b77650347/")}>
              <Image
                source={require("../assets/in.png")}
                style={styles.icon}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 80,
    width: 350,
    position: "relative",
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.8)",
  },
  backgroundimg: {
    width: 350,
    height: 150,
  },
  Cbody:{
    padding: 20,
  },
  profile: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 5,
    top: 90,
    left: 25,
    position: "absolute",
  },
  title: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: 900,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 600,
    opacity: 0.8,
    marginBottom: 20,
  },
  texto:{
    textAlign: 'justify',
  },
  icons: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  btnmain: {
    backgroundColor: '#000',
    padding: 10,
    width: 300,
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  tbtn:{
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
  },
  btns: {
  },
});
