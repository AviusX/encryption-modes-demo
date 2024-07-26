import express from 'express';
import { SINGLE_UPLOADED_FILE_NAME, encryptImageUsingECB, upload } from '../controllers/encrypt';

const router = express.Router();

router.post('/:encryptionMode', upload.single(SINGLE_UPLOADED_FILE_NAME), encryptImageUsingECB);

export default router;
