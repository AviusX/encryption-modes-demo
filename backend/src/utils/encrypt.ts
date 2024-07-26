import crypto from 'crypto';
import argon2 from 'argon2';
import { EncryptionMode } from '../types';

class Encrypt {
	static async byMode(dataToEncrypt: Buffer, password: Buffer, mode: EncryptionMode) {
		const salt = crypto.randomBytes(16); // generate a 16 byte random salt

		const derivedKey = await argon2.hash(password, {
			salt,
			type: argon2.argon2id,
			hashLength: 32,
			raw: true,
		});

		const cipher =
			mode === 'ECB' ? this.getECBCipher(derivedKey) : this.getCBCCipher(derivedKey);
		let encryptedImageData = cipher.update(dataToEncrypt);
		encryptedImageData = Buffer.concat([encryptedImageData, cipher.final()]);

		return encryptedImageData;
	}

	static async imageUsingECB(imageData: Buffer, password: Buffer) {
		const encryptedImageData = await this.byMode(imageData, password, 'ECB');
		return encryptedImageData.subarray(0, imageData.length);
	}

	static async imageUsingCBC(imageData: Buffer, password: Buffer) {
		const encryptedImageData = await this.byMode(imageData, password, 'CBC');
		return encryptedImageData.subarray(0, imageData.length);
	}

	private static getECBCipher(key: Buffer) {
		return crypto.createCipheriv('aes-256-ecb', key, null);
	}

	private static getCBCCipher(key: Buffer) {
		const iv = crypto.randomBytes(16);
		return crypto.createCipheriv('aes-256-cbc', key, iv);
	}
}

export default Encrypt;
