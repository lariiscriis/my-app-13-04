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

            banco.execSync(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL UNIQUE,
                senha TEXT NOT NULL
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


export function adicionarProduto(nome, preco){
    try{
        banco.runSync(
            'INSERT INTO produtos (nome,preco) VALUES (?,?)',
            [nome,preco]
        )
    }
    catch(error){
        console.log('Erro ao adicionar produto: ', error);
    }
}

export function editarProduto(id, nome, preco){
    try{
        banco.runSync(
            'UPDATE produtos SET nome = ?, preco = ? WHERE id = ?',
            [nome, preco, id]
        );

    }catch(error){
        console.log('Erro ao editar: ', error);
    }
}

export function excluirProduto(id){
    try{
        banco.runSync(
            'DELETE FROM produtos WHERE id = ?',
            [id]
        );
    } catch(error){
        console.log('Erro ao excluir: ', error);
    }
}

export function cadastrarUsuario(nome, senha){
    try{
        banco.runSync(
            'INSERT INTO usuarios (nome,senha) VALUES (?,?)',
            [nome,senha]
        );
        return true;
    }
    catch(error){
        console.log('Erro ao adicionar usuario: ', error);
        return false;
    }
}

export function loginUsuario(nome, senha){
    try{
        const usuario = banco.getFirstSync(
            'SELECT * FROM usuarios WHERE nome = ? AND senha = ?',
            [nome, senha]
        );

        if(usuario){
            return true;
        } else{
            return false;
        }
    } catch(error){
        console.log('Erro no Login: ', error );
        return false;
    }
}
