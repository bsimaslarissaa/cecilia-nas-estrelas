import { Image, ImageBackground } from 'expo-image';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PLANETAS = [
  { id: '1', nome: 'Mercúrio', img: require('@/assets/images/mercurio.png') },
  { id: '2', nome: 'Vênus', img: require('@/assets/images/venus.png') },
  { id: '3', nome: 'Terra', img: require('@/assets/images/terra.png') },
  { id: '4', nome: 'Marte', img: require('@/assets/images/marte.png') },
  { id: '5', nome: 'Júpiter', img: require('@/assets/images/jupiter.png') },
  { id: '6', nome: 'Saturno', img: require('@/assets/images/saturno.png') },
  { id: '7', nome: 'Urano', img: require('@/assets/images/urano.png') },
  { id: '8', nome: 'Netuno', img: require('@/assets/images/netuno.png') },
];

export default function SolarSystemScreen() {

  const selecionarPlaneta = (nome: string) => {
    Alert.alert('Planeta Escolhido', `Vamos explorar ${nome}! 🚀🪐`);
  };

  const clicarNoSol = () => {
    Alert.alert('O Rei do Sistema! ☀️', 'O Sol é uma estrela gigante e muito quente! Ela ilumina a Cecília e todos os planetas.');
  };

  return (
    <ImageBackground
      source={require('@/assets/images/bguniverse.jpeg')}
      style={styles.background}
      contentFit="cover"
    >
      <SafeAreaView style={styles.container}>
        
        <View style={styles.topo}>
          <Text style={styles.titulo}>Sistema Solar ☀️</Text>
          <Text style={styles.subtitulo}>Escolha um astro para explorar com a Cecília:</Text>
        </View>

        
        <Pressable style={styles.cardSol} onPress={clicarNoSol}>
          <Image 
            source={require('@/assets/images/sol.png')} 
            style={styles.imagemSol} 
            contentFit="contain" 
          />
          <View style={styles.infoSol}>
            <Text style={styles.nomeSol}>O Sol ☀️</Text>
            <Text style={styles.detalheSol}>A estrela central do nosso sistema</Text>
          </View>
        </Pressable>

        <FlatList
          data={PLANETAS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listaPlanetas}
          renderItem={({ item }) => (
            <Pressable style={styles.cardPlaneta} onPress={() => selecionarPlaneta(item.nome)}>
              <Image 
                source={item.img} 
                style={styles.imagemPlaneta} 
                contentFit="contain" 
              />
              <Text style={styles.nomePlaneta}>{item.nome}</Text>
            </Pressable>
          )}
        />

      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: hp('2%'),
    justifyContent: 'space-between',
  },
  topo: {
    paddingHorizontal: wp('6%'),
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: hp('3.5%'),
    fontWeight: 'bold',
  },
  subtitulo: {
    color: '#B78DFF',
    fontSize: hp('2%'),
    marginTop: hp('0.5%'),
  },
  

  cardSol: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: 'rgba(255, 165, 0, 0.15)', 
    marginHorizontal: wp('6%'),
    padding: wp('4%'),
    borderRadius: wp('5%'),
    borderWidth: 1,
    borderColor: 'rgba(255, 165, 0, 0.4)',
    gap: wp('4%'),
  },
  imagemSol: {
    width: wp('20%'),
    height: wp('20%'),
  },
  infoSol: {
    flex: 1,
  },
  nomeSol: {
    color: '#FFD700', 
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
  detalheSol: {
    color: '#FFFFFF',
    fontSize: hp('1.8%'),
    opacity: 0.8,
  },

  listaPlanetas: {
    paddingHorizontal: wp('6%'),
    alignItems: 'center',
    gap: wp('5%'),
  },
  cardPlaneta: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(92, 56, 214, 0.15)',
    padding: wp('4%'),
    borderRadius: wp('6%'),
    borderWidth: 1,
    borderColor: 'rgba(138, 108, 255, 0.3)',
    width: wp('40%'),
    height: hp('26%'), 
  },
  imagemPlaneta: {
    width: wp('24%'),
    height: wp('24%'),
    marginBottom: hp('1.5%'),
  },
  nomePlaneta: {
    color: '#FFFFFF',
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
