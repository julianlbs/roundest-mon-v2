import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import Image from "next/image";
import { useState } from "react";

const imageSize = 240;

export default function Home() {
	const [ids, setIds] = useState(getOptionsForVote());
	const [first, second] = ids;

	const firstPokemon = trpc.getPokemonById.useQuery({ id: first });
	const secondPokemon = trpc.getPokemonById.useQuery({ id: second });

	if (firstPokemon.isLoading || secondPokemon.isLoading) return null;
	return (
		<div className="h-screen w-screen flex flex-col justify-center items-center">
			<div className="text-2xl">Whick Pokémon is rounder?</div>
			<div className="p-2" />
			<div className="p-8 flex flex-row justify-between items-center max-w-2xl border rounded">
				<div className="w-44 h-44">
					<Image
						src={firstPokemon.data?.sprites.front_default!}
						alt="Pokemon Image"
						className="w-full"
						width={imageSize}
						height={imageSize}
					/>
					<div className="text-xl text-center capitalize mt-[-2rem]">
						{firstPokemon.data?.name}
					</div>
				</div>
				<div className="p-2">Vs</div>
				<div className="w-44 h-44">
					<Image
						src={secondPokemon.data?.sprites.front_default!}
						alt="Pokemon Image"
						width={imageSize}
						height={imageSize}
					/>
					<div className="text-xl text-center capitalize mt-[-2rem]">
						{secondPokemon.data?.name}
					</div>
					<div className="pb-4" />
				</div>
			</div>
		</div>
	);
}
