import { Request, Response } from 'express';
import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';
import multer from 'multer';
import Encrypt from '../utils/encrypt';
import fileType from 'file-type';
import { isEncyptionModeValid } from '../types';

export const upload = multer({ storage: multer.memoryStorage() });
export const SINGLE_UPLOADED_FILE_NAME = 'fileToEncrypt';

export const encryptImageUsingECB = async (req: Request, res: Response) => {
	if (!req.file) {
		res.sendStatus(400);
		return;
	}

	const encryptionMode = req.params.encryptionMode;
	if (!isEncyptionModeValid(encryptionMode)) {
		res.sendStatus(400);
		return;
	}

	const sharpImage = sharp(req.file.buffer);
	const imageMetadata = await sharpImage.metadata();
	const imageBuffer = await sharpImage.raw().toBuffer();

	const password = Buffer.from(crypto.randomBytes(50));
	const encryptedData =
		encryptionMode === 'ECB'
			? await Encrypt.imageUsingECB(imageBuffer, password)
			: await Encrypt.imageUsingCBC(imageBuffer, password);

	const encryptedImage = await sharp(encryptedData, {
		raw: {
			height: imageMetadata.height!,
			width: imageMetadata.width!,
			channels: imageMetadata.channels!,
		},
	})
		.jpeg()
		.toBuffer();

	const mimeType = await fileType.fromBuffer(encryptedImage);

	if (!mimeType) {
		res.sendStatus(500);
		return;
	}

	res.contentType(mimeType.mime);
	res.send(await encryptedImage);
};
