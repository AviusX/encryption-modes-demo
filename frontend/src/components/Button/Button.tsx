interface ButtonProps {
	children: React.ReactNode;
}

export const Button: React.FC<ButtonProps & React.HTMLProps<HTMLButtonElement>> = (props) => {
	const { children, ...propsOtherThanChildren } = props;
	return (
		<button
			class="bg-emerald-400 hover:bg-emerald-300 transition duration-200 text-background font-bold py-2 px-4 rounded inline-flex items-center justify-center gap-x-2"
			{...propsOtherThanChildren}
		>
			{children}
		</button>
	);
};

export default Button;
