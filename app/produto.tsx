import { useEffect, useState } from "react";
import { conectarBD, exibirProdutos } from "../database/database";
import { FlatList, View, Text} from "react-native";


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


    return(

        <View>
            <FlatList
            data={produtos}
            keyExtractor={(item)=> item.id.toString()}
            renderItem={({item}) =>(
                <View>
                    <Text>{item.id} - {item.nome}</Text>
                    <Text>Preço: R${item.preco}</Text>

                </View>
            )}
            
            
            />

        </View>

    );

}

