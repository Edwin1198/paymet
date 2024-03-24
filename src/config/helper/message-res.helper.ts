export enum CRUDMessagesSuccess {
  GetSuccess = 'Datos obtenidos correctamente.',
  PostSuccess = 'Registro guardado correctamente.',
  UpdateSuccess = 'Registro actualizado correctamente.',
  DeleteSuccess = 'Registro eliminado correctamente.',
}

export enum CRUDMessagesNotfound {
  GetNotfound = 'No se encontrarón registros',
  PosteNotfound = 'Los identificadores ya fueron registrados.',
  // UpdateNotfound = 'El registro no existe.',
  // DeleteNotfound = 'El registro no existe.',
}

export enum CRUDMessagesError {
  GetError = 'Ocurrio un error al intentar obtener los datos.',
  PostError = 'Ocurrio un error al intentar guardar el registro.',
  UpdateError = 'Ocurrio un error al intentar actualizar el registro.',
  DeleteError = 'Ocurrio un error al intentar eliminar el registro.',
}

export const CRUDOperation = {
  get: 'Mostrar datos',
  post: 'Guardar datos',
  put: 'Editar datos',
  delete: 'Eliminar datos',
};

export const CRUDOResponse = {
  getDescription: 'Se ejecuto el get correctamente',
  getStatus: 200,
  postDescription: 'Se ejecuto el insert correctamente',
  postStatus: 200,
  putDescription: 'Se ejecuto el put correctamente',
  putStatus: 200,
  deleteDescription: 'Se ejecuto el delete correctamente',
  deleteStatus: 200,
};

export const CRUDOBody = {
  postDescription: 'Información de la data',
  putDescription: 'Información de la data',
};

export const CRUDOParam = {
  putName: 'id',
  deleteName: 'id',
};

export const CRUDOLogger = {
  titlePost: 'ERROR INSERT',
  titlePut: 'ERROR UPDATE',
  titleDelete: 'ERROR DELETE',
  descripcionId: 'No se encontró la data con ese id',
};
