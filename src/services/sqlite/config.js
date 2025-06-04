import * as SQLite from 'expo-sqlite';

let database = null;

try {
  console.log('Tentando abrir o banco de dados...');
  database = SQLite.openDatabaseSync('imobiliaria.db');
  console.log('Banco de dados aberto com sucesso:', database);
} catch (error) {
  console.error('Erro ao abrir o banco de dados:', error);
}

export const initDatabase = () => {
  return new Promise(async (resolve, reject) => {
    if (!database) {
      reject(new Error('Database failed to open'));
      return;
    }

    try {
      // Criar tabela de imóveis
      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS imoveis (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          tipoImovel TEXT,
          endereco TEXT,
          valorVenda TEXT,
          dormitorios INTEGER,
          garagens INTEGER,
          area TEXT,
          situacao TEXT,
          iptu TEXT,
          imagens TEXT
        );
      `);
      console.log('Tabela imoveis criada com sucesso');

      resolve();
    } catch (error) {
      console.error('Erro ao criar tabelas:', error);
      reject(error);
    }
  });
};

export const executeQuery = async (query, params = []) => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  try {
    const result = await database.execAsync(query, params);
    return result;
  } catch (error) {
    console.error('Erro ao executar query:', error);
    throw error;
  }
};

export default database; 