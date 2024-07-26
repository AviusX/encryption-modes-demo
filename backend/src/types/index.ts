export type EncryptionMode = 'ECB' | 'CBC';
export function isEncyptionModeValid(encryptionMode: string): encryptionMode is EncryptionMode {
	return encryptionMode === 'ECB' || encryptionMode === 'CBC';
}
