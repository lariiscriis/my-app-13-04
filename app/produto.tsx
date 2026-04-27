import { useEffect, useState } from "react";
import { adicionarProduto, conectarBD, editarProduto, excluirProduto, exibirProdutos } from "../database/database";
import { FlatList, View, Text, TextInput, TouchableOpacity} from "react-native";
import React from "react";


export default function Produto(){
const [produtos, setProdutos] = useState<any>([]);

    useEffect(() => {
        conectarBD();
        carregarProdutos()
    }, []);

    function carregarProdutos(){
        const lista = exibirProdutos();
        setProdutos(lista);
    }

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [editandoId, setEditandoId] = useState<number | null>(null);

    
    function salvar(){
        if(editandoId !== null){
            editarProduto(editandoId, nome, parseFloat(preco));
            setEditandoId(null);
        }else{
        adicionarProduto(nome, parseFloat(preco));
        }

        setNome("");
        setPreco("");
        carregarProdutos();
    }

    function editar(item: any){
        setNome(item.nome);
        setPreco(String(item.preco));
        setEditandoId(item.id);
    }
    function deletar(id:number){
        excluirProduto(id);
        carregarProdutos();
    }

    return (

        <View style={{ flex: 1, padding: 16 }}>
            <TextInput
                placeholder="Digite o nome do produto"
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                placeholder="Digite o nome do produto"
                value={preco}
                onChangeText={setPreco}
                keyboardType="numeric"
            />
                        <TouchableOpacity onPress={salvar}>
                            <Text >  
                                {editandoId !== null ? "Atualizar" : 'Adicionar'}
                            </Text>
                        </TouchableOpacity>
                

            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.id} - {item.nome}</Text>
                        <Text>Preço: R${item.preco}</Text>
                        <TouchableOpacity onPress={() => editar(item) }>
                            <Text > Editar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => deletar(item.id) }>
                            <Text > Excluir</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>

    );
}

