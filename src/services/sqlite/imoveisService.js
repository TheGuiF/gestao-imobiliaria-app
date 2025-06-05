import db from './config';

export const salvarImovel = (imovel) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'));
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO imoveis (
          tipoImovel, endereco, valorVenda, dormitorios, 
          garagens, area, situacao, iptu, imagens, documentos
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          imovel.tipoImovel,
          imovel.endereco,
          imovel.valorVenda,
          imovel.dormitorios,
          imovel.garagens,
          imovel.area,
          imovel.situacao,
          imovel.iptu,
          JSON.stringify(imovel.imagens || []),
          JSON.stringify(imovel.documentos || [])
        ],
        (_, result) => {
          resolve({ ...imovel, id: result.insertId });
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const buscarTodosImoveis = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM imoveis;',
        [],
        (_, { rows: { _array } }) => {
          const imoveis = _array.map(imovel => ({
            ...imovel,
            imagens: JSON.parse(imovel.imagens || '[]'),
            documentos: JSON.parse(imovel.documentos || '[]')
          }));
          resolve(imoveis);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const buscarImovelPorId = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM imoveis WHERE id = ?;',
        [id],
        (_, { rows }) => {
          if (rows.length > 0) {
            const imovel = rows.item(0);
            resolve({
              ...imovel,
              imagens: JSON.parse(imovel.imagens || '[]'),
              documentos: JSON.parse(imovel.documentos || '[]')
            });
          } else {
            resolve(null);
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const atualizarImovel = (id, imovelAtualizado) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'));
      return;
    }

    console.log('Atualizando imóvel no banco:', { id, imovelAtualizado });
    
    // Ensure documentos is an array before stringifying
    const documentosString = JSON.stringify(Array.isArray(imovelAtualizado.documentos) ? 
      imovelAtualizado.documentos : []);
    const imagensString = JSON.stringify(Array.isArray(imovelAtualizado.imagens) ? 
      imovelAtualizado.imagens : []);
    
    console.log('Strings preparadas para o banco:', {
      documentos: documentosString,
      imagens: imagensString
    });

    db.transaction(tx => {
      tx.executeSql(
        `UPDATE imoveis SET 
          tipoImovel = ?, 
          endereco = ?, 
          valorVenda = ?, 
          dormitorios = ?, 
          garagens = ?, 
          area = ?, 
          situacao = ?, 
          iptu = ?,
          imagens = ?,
          documentos = ?
        WHERE id = ?;`,
        [
          imovelAtualizado.tipoImovel,
          imovelAtualizado.endereco,
          imovelAtualizado.valorVenda,
          imovelAtualizado.dormitorios,
          imovelAtualizado.garagens,
          imovelAtualizado.area,
          imovelAtualizado.situacao,
          imovelAtualizado.iptu,
          imagensString,
          documentosString,
          id
        ],
        (_, result) => {
          console.log('Resultado da atualização:', result);
          if (result.rowsAffected > 0) {
            resolve({ ...imovelAtualizado, id });
          } else {
            reject(new Error('Imóvel não encontrado'));
          }
        },
        (_, error) => {
          console.error('Erro na query SQL:', error);
          reject(error);
        }
      );
    });
  });
};

export const deletarImovel = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM imoveis WHERE id = ?;',
        [id],
        (_, result) => {
          if (result.rowsAffected > 0) {
            resolve(true);
          } else {
            reject(new Error('Imóvel não encontrado'));
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}; 