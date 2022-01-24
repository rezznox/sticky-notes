import api from './api';

export const getNotes = ({ cancelToken }) => {
    return api.get(`/notes`,{} ,{ cancelToken });
};

export const deleteNote = ({ id, cancelToken }) => {
  return api.delete(`/notes`, {id} ,{ cancelToken });
};

export const postNote = ({ cancelToken }) => {
  return api.post(`/notes`, {} ,{ cancelToken });
};

export const putNote = (note, cancelToken = undefined) => {
  return api.put(`/notes`, note ,{ cancelToken });
};
