import Link from "next/link";
import React from "react";
import Tag from "../atoms/Tag";

interface Props {
	title: string,
	img: string,
	id: any,
	genre: string
}

const ItemCardBook = ({ title, img, id, genre }: Props) => {

	return (
		<div
			key={id}
			className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all p-3 text-center"
		>
			<div className="w-full flex justify-center relative">
				<img
					className="w-[330] h-[250] object-cover"
					src={img}
					alt={title}
					loading="lazy"
				/>
				<div className="absolute bottom-[2%] right-[3%] ">
					<Tag label={genre} />
				</div>
			</div>


			<p className="mt-2 text-gray-800 font-semibold text-sm">
				{title}
			</p>

			<div className="flex justify-evenly mt-1 mb-2">

				<img
					width="120"
					height="120"
					src="/assets/img/icon/16231558095-star-rating.svg"
					alt="Estrellas"
				/>
			</div>

			<Link href={`/books/${id}`} className="bg-green-100 border border-green-300 rounded px-4 py-1 inline-flex items-center justify-center gap-3 mx-auto w-32 hover:bg-green-400 hover:text-white hover:border-green-500 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="w-4 h-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="2"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
					/>
				</svg>
				<span className="font-semibold">Detalles</span>
			</Link>
		</div>
	);
};

export default ItemCardBook;


//src="https://tse2.mm.bing.net/th/id/OIP.KUwNL_TVKJrUXdjKAfPcxQHaKi?cb=12ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"
/*

OJO
				<div className="w-8 h-8 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition cursor-pointer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-4 h-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
						/>
					</svg>
				</div>


BOTON DE COMPRA

			<div className="bg-green-100 border border-green-300 rounded px-4 py-2 inline-flex items-center justify-center mx-auto w-32 hover:bg-green-400 hover:text-white hover:border-green-500 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="w-5 h-5 mr-2"
				>
					<path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
				</svg>
				<span className="font-semibold">{price}$</span>
			</div>
*/