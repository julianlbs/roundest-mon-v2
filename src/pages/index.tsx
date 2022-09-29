import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "@/server/router";
import Image from "next/image";
import { useState } from "react";
import type React from "react";
import Link from "next/link";

const imgSize = 256;

const btn =
	"inline-flex items-center px-2.5 py-2.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

export default function Home() {
	const [ids, setIds] = useState(getOptionsForVote());
	const [first, second] = ids;

	const firstPokemon = trpc.getPokemonById.useQuery({ id: first });
	const secondPokemon = trpc.getPokemonById.useQuery({ id: second });

	const voteMutation = trpc.castVote.useMutation();

	const voteForRoundest = (selected: number) => {
		if (selected === first) {
			voteMutation.mutate({ votedForId: first, votedAgainstId: second });
		} else {
			voteMutation.mutate({ votedForId: second, votedAgainstId: first });
		}

		setIds(getOptionsForVote());
	};

	const dataLoaded =
		!firstPokemon.isLoading &&
		firstPokemon.data &&
		!secondPokemon.isLoading &&
		secondPokemon.data;

	return (
		<div className="h-screen w-screen flex flex-col justify-center items-center relative">
			{dataLoaded && (
				<>
					<div className="text-2xl">Whick Pokémon is rounder?</div>
					<div className="p-2" />
					<div className="px-12 pt-12 pb-24 flex flex-row justify-between items-center border rounded">
						{
							<>
								<PokemonListing
									pokemon={firstPokemon.data!}
									vote={() => voteForRoundest(first)}
								/>
								<div className="p-2">Vs</div>
								<PokemonListing
									pokemon={secondPokemon.data!}
									vote={() => voteForRoundest(second)}
								/>
							</>
						}
					</div>
					<div className="p-2 absolute bottom-0 right-0 px-8 pb-8 text-xl">
						<Link href="results">
							<a>See Voting Results &rarr;</a>
						</Link>
					</div>
				</>
			)}
		</div>
	);
}

type PokemonFromServer = inferProcedureOutput<AppRouter["getPokemonById"]>;

const PokemonListing: React.FC<{
	pokemon: PokemonFromServer;
	vote: () => void;
}> = (props) => {
	return (
		<div className="w-44 h-44 flex flex-col items-center">
			<div>
				<Image
					src={props.pokemon.spriteUrl}
					alt="Pokemon Image"
					width={imgSize}
					height={imgSize}
				/>
			</div>
			<div className="mt-[-2rem]" />
			<div className="text-xl text-center capitalize">{props.pokemon.name}</div>
			<button
				className={`${btn} justify-self-end mt-2`}
				onClick={() => props.vote()}
			>
				Rounder
			</button>
		</div>
	);
};
