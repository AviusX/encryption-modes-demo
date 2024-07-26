import { BiChevronDown } from 'react-icons/bi';

interface SelectProps {
	children: React.ReactNode;
}

export const Select: React.FC<SelectProps & React.HTMLProps<HTMLSelectElement>> = (props) => {
	const { children, ...propsOtherThanChildren } = props;
	return (
		<div
			className={
				'flex bg-transparent backdrop-brightness-200 text-white rounded-lg items-center cursor-pointer relative'
			}
		>
			<select
				class="appearance-none w-full h-full rounded-lg leading-tight focus:outline-none py-3 px-4 pr-8 bg-transparent cursor-pointer"
				{...propsOtherThanChildren}
			>
				{children}
			</select>
			<BiChevronDown className={'absolute right-3 pointer-events-none h-6 w-6'} />
		</div>
	);
};

export default Select;
