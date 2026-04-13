import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { router } from 'expo-router';

export default function App() {
  const[nome, setNome] = useState('');

  async function salvar(){

    await AsyncStorage.setItem('nm_user', nome)
    router.push('/home')

  }

  return (
    <View style={styles.container}>
      <Text>Digite seu nome: </Text>

      <TextInput
      value= {nome}
      onChangeText={setNome}
      placeholder="Seu Nome"
      style={styles.caixa}
      
      
      />

      <Button title="Entrar" onPress={salvar}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbd1d1ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caixa:{
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,

  }
});
 