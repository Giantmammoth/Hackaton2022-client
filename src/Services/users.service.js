import {BASE_URL} from '../Constantes/Urls';
import axios from 'axios'
import axiosInstance from '../Redux/axiosInstance';

class UserServices {
    
    signupprof = (data) =>{
        return axios.post(`${BASE_URL}/User/signupProf`, data)
    };

    signupstud = (data) =>{
        return axios.post(`${BASE_URL}/User/signupstud`, data)
    };

    verify = (id, token) => {
        return axios.get(`${BASE_URL}/User/${id}/verify/${token}`)
    };

    getUser = (id) => {
        return axiosInstance.get(`${BASE_URL}/User/${id}`)
    };

}

export default new UserServices();