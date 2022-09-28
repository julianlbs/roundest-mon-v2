import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import Image from "next/image";
import { useState } from "react";

const imageSize = 240;

const btn =
	"inline-flex items-center px-2.5 py-2.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

export default function Home() {
	const [ids, setIds] = useState(getOptionsForVote());
	const [first, second] = ids;

	const firstPokemon = trpc.getPokemonById.useQuery({ id: first });
	const secondPokemon = trpc.getPokemonById.useQuery({ id: second });

	if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

	const voteForRoundest = (selected: number) => {
		// todo: fire mutation to persist changes

		setIds(getOptionsForVote());
	};
	return (
		<div className="h-screen w-screen flex flex-col justify-center items-center">
			<div className="text-2xl">Whick Pokémon is rounder?</div>
			<div className="p-2" />
			<div className="p-8 flex flex-row justify-between items-center max-w-2xl border rounded">
				<div className="w-44 h-44 flex flex-col items-center ">
					<Image
						src={firstPokemon.data?.sprites.front_default!}
						alt="Pokemon Image"
						width={imageSize}
						height={imageSize}
					/>
					<div className="text-xl text-center capitalize mt-[-2rem]">
						{firstPokemon.data?.name}
					</div>
					<button
						className={`${btn} justify-self-end`}
						onClick={() => voteForRoundest(first)}
					>
						Rounder
					</button>
				</div>
				<div className="p-2">Vs</div>
				<div className="w-44 h-44 flex flex-col items-center ">
					<Image
						src={secondPokemon.data?.sprites.front_default!}
						alt="Pokemon Image"
						width={imageSize}
						height={imageSize}
					/>
					<div className="text-xl text-center capitalize mt-[-2rem]">
						{secondPokemon.data?.name}
					</div>
					<button className={btn} onClick={() => voteForRoundest(second)}>
						Rounder
					</button>
				</div>
			</div>
		</div>
	);
}
