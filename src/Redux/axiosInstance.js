import axios from "axios";
import { toast } from "react-toastify";
import {BASE_URL} from '../Constantes/Urls';

let token = null;
const root = JSON.parse(window.localStorage.getItem("persist:root"));

if (root) {
	const { auth } = root;
	const { user } = JSON.parse(auth);
	if (user) token = user.token;
	console.log (token)
}

const axiosInstance = axios.create({
	baseURL:  `${BASE_URL}`,
	headers: {
		"Content-Type": "application/json",
		"x-auth-token": token ? token : "",
	},
});

axiosInstance.interceptors.request.use(
	(req) => {
		return Promise.resolve(req);
	},
	(error) => {
		if (
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500
		) {
			toast.error(error.response.data.message);
		} else {
			console.log(error);
			toast.error("Something went wrong!");
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
