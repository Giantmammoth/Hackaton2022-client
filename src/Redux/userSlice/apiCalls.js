import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance";
import * as actions from "./index";
import {BASE_URL} from '../../Constantes/Urls';


export const getUser = async (payload, dispatch) => {
	dispatch(actions.getUserStart());
	try {
		const { data } = await axiosInstance.get(BASE_URL + `/User/${payload}`);
		dispatch(actions.getUserSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.getUserFailure());
		return false;
	}
};

// export const updateUser = async (payload, dispatch) => {
// 	dispatch(actions.updateUserStart());
// 	try {
// 		const url = BASE_URL + `/users/${payload.id}`;
// 		const { data } = await axiosInstance.put(url, payload.data);
// 		dispatch(actions.updateUserSuccess(data.data));
// 		toast.success(data.message);
// 		return true;
// 	} catch (error) {
// 		dispatch(actions.getUserFailure());
// 		return false;
// 	}
// };


