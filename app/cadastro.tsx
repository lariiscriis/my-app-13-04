import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import { cadastrarUsuario, conectarBD } from "../database/database";
import {router} from 'expo-router';
import React from "react";


export default function Cadastro(){
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");

        async function carregar(){
        const valor = await AsyncStorage.getItem('nm_user');
        if(valor) setNome(valor);
    }
        useEffect(() => {
            conectarBD();
            carregar();
        }, []);

        function Cadastrar(){
            if (!nome || !senha){
                alert('Preencha todos os campos');
                return;
            }

            const sucesso = cadastrarUsuario(nome,senha);
            if (sucesso){
                AsyncStorage.setItem('nm_user', nome);
                alert("Senha cadastrada com sucesso!");
                router.replace('/home');
            }
            else{
                alert("Erro ao cadastrar usuário. O nome já existe.");
            }
        }

    return(
        <View style={{ flex: 1, padding: 16 }}>
            <Text>Cadastro de Usuário</Text>
            <TextInput
                placeholder="Digite seu nome"
                value={nome}
                editable={true}

            />
            <TextInput
                placeholder="Digite sua senha"    
                value={senha}
                onChangeText={setSenha}
                
            />
            <Button 
                title="Cadastrar"
                onPress={Cadastrar}
            />
        </View>
    );
}       