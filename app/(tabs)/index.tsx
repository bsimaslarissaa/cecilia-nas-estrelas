import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Pressable, Alert, SafeAreaView } from 'react-native';
import { Image } from 'expo-image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function HomeScreen() {
  return (
      <ImageBackground 
      source={require('@/assets/images/fundocecilia.jpeg')} 
      style={styles.background}
      resizeMode="cover"
    >
       <SafeAreaView style={styles.safeArea}>
      <View style={styles.containerContent}>
        <Text style={styles.texto}>Cecília nas estrelas </Text>

        <Image 
          source={require('@/assets/images/ceciliainicio.png')} 
          style={styles.cecilia} 
          />
          <Pressable style={styles.botao}>
          <Text style={styles.textoBotao}> Entrar como convidado</Text>
        </Pressable>
      </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, 
  },
  safeArea: {
    flex: 1,
    height: '100%', // Força o container seguro a usar toda a altura disponível
  },
  containerContent: {
    flex: 1,
    height: '100%',          // Garante que a View interna se espalhe pela tela toda
    justifyContent: 'center', // Agora o 'center' vai funcionar perfeitamente
    alignItems: 'center',
    gap: hp('6%'),  
  },
  texto: {
    color: '#fff',
    fontSize: hp('4%'),
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'serif',
  },
  cecilia: {
    width: wp('65%'),  
    height: wp('65%'),     
    borderRadius: wp('8%'),
  },
  botao: {
    backgroundColor: '#1e1289',
    paddingVertical: hp('1.8%'), 
    paddingHorizontal: wp('8%'),  
    borderRadius: wp('6%'), 
    marginTop: hp('1%'), 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textoBotao: {
    color: '#f7f7f7',
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
});
