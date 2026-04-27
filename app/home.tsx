import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import {router} from 'expo-router';
import React from "react";
import { loginUsuario } from "../database/database";


export default function Home(){
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');

    function entrar(){
        const sucesso = loginUsuario(nome,senha);
        if (sucesso){
            router.replace('/produto');
        }
        else{
            alert("Senha inválida")
        }
    }

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

                <TextInput
                    placeholder="Digite seu senha"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={true}

                 />
 
                        <TouchableOpacity onPress={() => router.push('/cadastro')}>
                            <Text >  
                                Não tem conta? Cadastre-se
                            </Text>
                        </TouchableOpacity>
                
                <Button
                    title="Entrar"
                    onPress={entrar}
                />
            {/* <Button 
            title="Ver produtos"
            onPress={() => router.push('/produto')}
            /> */}


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