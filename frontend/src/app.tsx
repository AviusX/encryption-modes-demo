import { useState } from 'preact/hooks';
import Select from './components/Select';
import { BsCardImage, BsFillShieldLockFill } from 'react-icons/bs';
import { CSSProperties } from 'preact/compat';
import { EncryptionMode } from './types/encryption';
import { getDataURLForFile } from './utils/image';
import Button from './components/Button';
import { getEncryptedImage } from './api';

export function App() {
	const [selectedImage, setSelectedImage] = useState<File>();
	const [encryptedImage, setEncryptedImage] = useState<File>();
	const [encryptionMode, setEncryptionMode] = useState<EncryptionMode>('ECB');

	const imageChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const selectedItem = event.currentTarget.files?.item(0);
		if (!selectedItem) return;
		setSelectedImage(selectedItem);
	};

	const encryptionModeChangeHandler: React.ChangeEventHandler<HTMLSelectElement> = (event) =>
		setEncryptionMode(event.currentTarget.value as EncryptionMode);

	const encryptButtonHandler = async () => {
		if (!selectedImage) return;
		const encryptedBlob = await getEncryptedImage(selectedImage, encryptionMode);
		const encryptedFile = new File([encryptedBlob.data], 'encrypted');
		setEncryptedImage(encryptedFile);
	};

	return (
		<div className={'flex flex-col h-screen max-h-screen w-full bg-background'}>
			<div className={'flex flex-col justify-center items-center py-2 px-8 gap-y-8 h-[25vh]'}>
				<div className={'flex flex-col gap-4 w-2/6 m-auto'}>
					<label>Encryption Settings</label>
					<Select onChange={encryptionModeChangeHandler}>
						<option value="ECB">ECB</option>
						<option value="CBC">CBC</option>
					</Select>
					<Button onClick={encryptButtonHandler}>
						<BsFillShieldLockFill />
						Encrypt
					</Button>
				</div>
				{/* <hr className={'border-1 w-full'} /> */}
				<div className={'border-b-[1px] border-background brightness-[400%] w-9/12'} />
			</div>
			<div className={'flex items-center w-full justify-evenly m-0 h-[75vh] p-8'}>
				<div className={'w-5/12 h-full p-2'}>
					<div className={'flex flex-col gap-x-8 relative justify-center h-full'}>
						<input
							type="file"
							accept={'.jpeg,.png,.jpg'}
							style={styles.fileInput}
							onChange={imageChangeHandler}
						/>
						{selectedImage === undefined ? (
							<>
								<BsCardImage className={'h-2/6 w-auto'} />
								<p className={'text-3xl text-center uppercase tracking-wider mt-4'}>
									Drop or select an image
								</p>
							</>
						) : (
							<div className={'flex items-center justify-center h-full'}>
								<img
									src={getDataURLForFile(selectedImage)}
									className={'rounded-xl h-full'}
								/>
							</div>
						)}
					</div>
				</div>
				<div className={'border-l-[1px] border-background brightness-[400%] h-1/2'} />
				<div className={'w-5/12 h-full p-2'}>
					{!!encryptedImage && (
						<div className={'w-full h-full flex items-center justify-center'}>
							<img
								src={getDataURLForFile(encryptedImage)}
								className={'rounded-xl h-full'}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

const styles: { [key: string]: CSSProperties } = {
	fileInput: {
		position: 'absolute',
		opacity: 0,
		width: '100%',
		height: '100%',
		zIndex: 10,
	},
};
