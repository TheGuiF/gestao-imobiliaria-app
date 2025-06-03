import db from './config';

export const salvarCliente = (cliente) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'));
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO clientes (
          nome, email, telefone, cidade, interesse, observacoes
        ) VALUES (?, ?, ?, ?, ?, ?);`,
        [
          cliente.nome,
          cliente.email,
          cliente.telefone,
          cliente.cidade,
          cliente.interesse,
          cliente.observacoes
        ],
        (_, result) => {
          resolve({ ...cliente, id: result.insertId });
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const buscarTodosClientes = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM clientes;',
        [],
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const buscarClientePorId = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM clientes WHERE id = ?;',
        [id],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows.item(0));
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

export const atualizarCliente = (id, clienteAtualizado) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE clientes SET 
          nome = ?, 
          email = ?, 
          telefone = ?, 
          cidade = ?, 
          interesse = ?, 
          observacoes = ?
        WHERE id = ?;`,
        [
          clienteAtualizado.nome,
          clienteAtualizado.email,
          clienteAtualizado.telefone,
          clienteAtualizado.cidade,
          clienteAtualizado.interesse,
          clienteAtualizado.observacoes,
          id
        ],
        (_, result) => {
          if (result.rowsAffected > 0) {
            resolve({ ...clienteAtualizado, id });
          } else {
            reject(new Error('Cliente não encontrado'));
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const deletarCliente = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM clientes WHERE id = ?;',
        [id],
        (_, result) => {
          if (result.rowsAffected > 0) {
            resolve(true);
          } else {
            reject(new Error('Cliente não encontrado'));
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}; 