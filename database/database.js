import * as SQLite from 'expo-sqlite'

const banco = SQLite.openDatabaseSync('banco.db');

export function conectarBD(){
    try{
        banco.execSync(`
            CREATE TABLE IF NOT EXISTS produtos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT,
                preco REAL
                );
            
            `);

            const resposta = banco.getFirstSync(
                'SELECT COUNT(*) as total FROM produtos'
            );

            if (resposta.total === 0){
                banco.execSync(
                    `
                    INSERT INTO produtos (nome, preco) VALUES
                    ('Arroz', 25.50),
                    ('Feijão', 8.90),
                    ('Macarrão', 5.30);
                    `
                );
            }
        
    }

    catch(error) {
        console.log('Erro no banco: ', error);
    }
}

export function exibirProdutos(){
    try{
        return banco.getAllSync(`SELECT * FROM produtos`);
    }catch(error){
        console.log('Erro ao buscar produtos: ', error);
        return [];
    }
}