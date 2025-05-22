// src/database/documentos.js

// Simula os métodos de banco para integração futura com SQLite
// Seu colega irá trocar esses métodos para acesso real ao banco

// Documentos salvos em memória (simulação)
let documentosMock = [];

// Salvar novo documento
export const salvarDocumento = async (doc) => {
  documentosMock.push(doc);
  console.log("📄 Documento salvo (simulado):", doc);

  // TODO: Substituir isso por inserção em SQLite
  /*
  await db.transaction(async (tx) => {
    await tx.executeSql(
      `INSERT INTO documentos (imovel_id, uri, tipo) VALUES (?, ?, ?);`,
      [doc.imovelId, doc.uri, doc.tipo]
    );
  });
  */
};

// Remover documento por ID
export const removerDocumento = async (docId) => {
  documentosMock = documentosMock.filter((d) => d.id !== docId);
  console.log("❌ Documento removido (simulado):", docId);

  // TODO: Substituir por DELETE no banco
  /*
  await db.transaction(async (tx) => {
    await tx.executeSql(`DELETE FROM documentos WHERE id = ?;`, [docId]);
  });
  */
};

// Buscar documentos de um imóvel
export const buscarDocumentosPorImovel = async (imovelId) => {
  // Simula retorno do banco
  return documentosMock.filter((d) => d.imovelId === imovelId);

  // TODO: Substituir por SELECT no banco
  /*
  let documentos = [];
  await db.transaction(async (tx) => {
    const res = await tx.executeSql(`SELECT * FROM documentos WHERE imovel_id = ?;`, [imovelId]);
    documentos = res[0].rows._array;
  });
  return documentos;
  */
};
