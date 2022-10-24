import {BASE_URL} from '../Constantes/Urls';
import axios from 'axios'
import axiosInstance from '../Redux/axiosInstance';

class BookService {
    

    uploadBook = (id, data) => {
        return axiosInstance.post(`${BASE_URL}/User/Book/uploadsBook/${id}`, data)
    };

    getPublicBook = () => {
        return axiosInstance.get(`${BASE_URL}/User/Book/PublicBook`)
    };

    getPrivateBook = (id) => {
        return axiosInstance.get(`${BASE_URL}/User/Book/PrivateBook/${id}`)
    };

    DownloadBook = (id) => {
        return axiosInstance.get(`${BASE_URL}/User/Book/downloadBook/${id}`, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            responseType: 'arraybuffer'
          })
    }
}

export default new BookService();