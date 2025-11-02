import { useBookStore } from "@/store/BookStore";
import { Filter } from "@/types/filter";
import { useState } from "react";

interface Props {
	options?: string[],
	label?: string
}

const GenreSelector = ({ options = ['DRAMA', 'ACCION', 'FANTASIA', 'HORROR'], label = "Género" }: Props) => {

	const { setFilter, filter } = useBookStore();
	const [optionSelected, setOptionSelected] = useState("");
	const [showOptions, setShowOptions] = useState(false);
	const [filterSelect, setFilterSelect] = useState<Filter>({ author: '', genre: '' });

	const saveFilter = (op: string) => {
		setOptionSelected(op);

		// Mezclar con el filtro actual del store (no lo sobrescribas)
		let newFilter = { ...filter };

		if (label === "Género") newFilter = { ...newFilter, genre: op };
		if (label === "Autor") newFilter = { ...newFilter, author: op };

		setFilter(newFilter);
		console.log("Nuevo filtro:", newFilter);
	};


	return (
		<div className="relative select-none"
			onBlur={() => setShowOptions(false)} //al perder focus
			tabIndex={0} //activa o desactiva focus
		>
			<div className="bg-pink-300 w-[200px] ps-4 py-2 cursor-pointer" onClick={() => setShowOptions(!showOptions)} >
				{
					optionSelected.length
						? <p>{optionSelected}</p>
						: <p>{label}:  Seleccionar</p>
				}
			</div>
			<ul className={`absolute left-0 top-full w-[200px] max-h-[200px] overflow-y-auto bg-gray-100 z-100 ${showOptions ? "block" : "hidden"}`}>

				{options?.map((op) => (
					<li key={op} onClick={() => {
						//setOptionSelected(op);
						saveFilter(op)
						setShowOptions(false);
					}}
						className="hover:bg-gray-500 hover:text-white ps-4 py-2 w-full cursor-pointer" >
						{op}
					</li>
				))}
			</ul>
		</div>
	)
}

export default GenreSelector
