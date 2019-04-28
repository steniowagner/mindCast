import axios from 'axios';
import { SERVER_URL } from 'react-native-dotenv';

const api = axios.create({
  baseURL: SERVER_URL,
});

export default api;
