import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import {router} from 'expo-router';


export default function Home(){
    const [nome, setNome] = useState('');

    async function carregar(){
        const valor = await AsyncStorage.getItem('nm_user');
        if(valor) setNome(valor);
    }

    useEffect(() => {
        carregar();
    }, []);

    return(
        
        <View style={styles.container}>
            <Text>Bem Vindo(a) {nome}</Text>

            <Button 
            title="Ver produtos"
            onPress={() => router.push('/produto')}
            
            />
        </View>

    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbd1d1ff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});