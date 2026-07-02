import { Image } from 'expo-image';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require('@/assets/images/fundocecilia.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.containerContent}>

        <View style={styles.topoContainer}>
          <Image
            source={require('@/assets/images/logo-cecilia.png')}
            style={styles.logo}
            contentFit="contain"
          />
          <Text style={styles.subtitulo}>
            Aprenda astronomia{"\n"}brincando ✨
          </Text>
        </View>

        <Image
          source={require('@/assets/images/ceciliainicio.png')}
          style={styles.cecilia}
          contentFit="contain"
        />

        <View style={styles.baseContainer}>
          <Pressable style={styles.botao}>
            <Text style={styles.textoBotao}>
              Entrar como convidado
            </Text>
          </Pressable>

          <View style={styles.loginContainer}>
            <Text style={styles.loginTexto}>
              Já possui uma conta?
            </Text>
            <Text style={styles.loginLink}>
              Entrar
            </Text>
          </View>
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  containerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between', 
    paddingHorizontal: wp('5%'),    
    paddingVertical: hp('2%'),
  },

  topoContainer: {
    marginTop: -hp('10%'),
    alignItems: 'center',
    width: '100%',
    gap: hp('0%'),
  },

  logo: {
    width: wp('130%'), 
    height: hp('36%'), 
  },

  subtitulo: {
    color: '#FFFFFF',
    fontSize: hp('2.2%'),           
    textAlign: 'center',
    lineHeight: hp('3%'),           
    fontWeight: '500',
    marginTop: -hp('10%'), 
  },

  cecilia: {
    width: wp('100%'),               
    height: hp('38%'),
  },


  baseContainer: {
    alignItems: 'center',
    width: '100%',
    gap: hp('2.5%'),
  },

  botao: {
    width: wp('85%'),
    backgroundColor: '#5C38D6',
    paddingVertical: hp('2%'),      
    borderRadius: wp('8%'),         
    alignItems: 'center',
    shadowColor: '#8A6CFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: hp('2.4%'),           
    fontWeight: 'bold',
  },

  loginContainer: {
    alignItems: 'center',
  },

  loginTexto: {
    color: '#FFFFFF',
    fontSize: hp('2%'),
  },

  loginLink: {
    color: '#B78DFF',
    fontSize: hp('2.5%'),           
    fontWeight: 'bold',
    marginTop: hp('0.5%'),
    textDecorationLine: 'underline',
  },
});