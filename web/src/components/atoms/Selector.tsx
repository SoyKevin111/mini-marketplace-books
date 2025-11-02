import { useBookStore } from "@/store/BookStore";
import { getFilterStorage } from "@/utils/filterValuesLoad";
import { useEffect, useState } from "react";

interface Props {
	options?: string[];
	label?: string;
}

const GenreSelector = ({ options, label }: Props) => {
	const { setFilter, filter } = useBookStore();
	const [optionSelected, setOptionSelected] = useState("");
	const [showOptions, setShowOptions] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const storedFilter = getFilterStorage();
		setFilter(storedFilter);
		if (label === "Género") setOptionSelected(storedFilter.genre || "");
		if (label === "Autor") setOptionSelected(storedFilter.author || "");
	}, []);

	// 🔄 Sincroniza con Zustand cada vez que el filtro global cambie
	useEffect(() => {
		if (label === "Género") setOptionSelected(filter.genre || "");
		if (label === "Autor") setOptionSelected(filter.author || "");
	}, [filter, label]);

	if (!mounted) return null;

	const saveFilter = (op: string) => {
		let newFilter = { ...filter };
		if (label === "Género") newFilter = { ...newFilter, genre: op };
		if (label === "Autor") newFilter = { ...newFilter, author: op };
		setFilter(newFilter);
	};

	return (
		<div
			className="relative select-none"
			onBlur={() => setShowOptions(false)}
			tabIndex={0}
		>
			<div
				className="bg-pink-300 w-[200px] ps-4 py-2 cursor-pointer"
				onClick={() => setShowOptions(!showOptions)}
			>
				{optionSelected.length ? (
					<p>{optionSelected}</p>
				) : (
					<p>
						{label}: Seleccionar
					</p>
				)}
			</div>
			<ul
				className={`absolute left-0 top-full w-[200px] max-h-[200px] overflow-y-auto bg-gray-100 z-100 ${showOptions ? "block" : "hidden"
					}`}
			>
				{options?.map((op) => (
					<li
						key={op}
						onClick={() => {
							saveFilter(op);
							setShowOptions(false);
						}}
						className="hover:bg-gray-500 hover:text-white ps-4 py-2 w-full cursor-pointer"
					>
						{op}
					</li>
				))}
			</ul>
		</div>
	);
};

export default GenreSelector;
