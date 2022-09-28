import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

export default function Home() {
	const [ids, setIds] = useState(getOptionsForVote());
	const [first, second] = ids;

	return (
		<div className="h-screen w-screen flex flex-col justify-center items-center">
			<div className="text-2xl">Whick Pokémon is rounder?</div>
			<div className="p-2" />
			<div className="p-8 flex flex-row justify-between items-center max-w-2xl border rounded">
				<div className="w-16 h-16 bg-red-600">{first}</div>
				<div className="p-2">Vs</div>
				<div className="w-16 h-16 bg-red-600">{second}</div>
			</div>
		</div>
	);
}
