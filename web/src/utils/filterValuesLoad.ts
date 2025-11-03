import { Filter } from "@/types/filter";

export const getFilterStorage = (): Filter => {
	const stored = localStorage.getItem("book-store");
	return stored
		? JSON.parse(stored).state?.filter || { genre: "", author: "", favorites: false }
		: { genre: "", author: "", favorites: false };
};