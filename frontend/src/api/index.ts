import axios from 'axios';
import { EncryptionMode } from '../types/encryption';

const requests = axios.create({ baseURL: 'http://localhost:9000' });

export const getEncryptedImage = async (fileToEncrypt: File, encryptionMode: EncryptionMode) => {
	const form = new FormData();
	form.append('fileToEncrypt', fileToEncrypt);
	return await requests.post(`/encrypt/${encryptionMode}`, form, { responseType: 'blob' });
};
