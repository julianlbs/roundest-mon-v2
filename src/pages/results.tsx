import type { GetServerSideProps } from "next";
import { prisma } from "@/server/utils/prisma";
import { AsyncReturnType } from "@/utils/AsyncInferType";
import Image from "next/image";
import Link from "next/link";

type PokemonQueryResult = AsyncReturnType<typeof getPokemonSorted>;

const ResultsPage: React.FC<{ pokemon: PokemonQueryResult }> = (props) => {
	return (
		<div>
			<div className="p-2 absolute top-0 left-0 px-8 pt-4 text-xl">
				<Link href="/">
					<a>&larr; Go back</a>
				</Link>
			</div>
			<div className="flex flex-col items-center">
				<h2 className="text-2xl pt-4 pb-2">Results</h2>
				<div className="felx flex-col w-full max-w-2xl">
					{props.pokemon.map((p, index) => (
						<PokemonListing pokemon={p} key={index} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ResultsPage;

export const getStaticProps: GetServerSideProps = async () => {
	const pokemonSorted = await getPokemonSorted();
	return { props: { pokemon: pokemonSorted }, revalidate: 60 };
};

const getPokemonSorted = async () => {
	return await prisma.pokemon.findMany({
		orderBy: { votesFor: { _count: "desc" } },
		select: {
			id: true,
			name: true,
			spriteUrl: true,
			_count: {
				select: {
					votesFor: true,
					votesAgainst: true,
				},
			},
		},
	});
};

const PokemonListing: React.FC<{ pokemon: PokemonQueryResult[number] }> = (
	props
) => {
	return (
		<div className="flex items-center justify-between border-b p-2">
			<div className="flex items-center">
				<Image
					src={props.pokemon.spriteUrl}
					width={64}
					height={64}
					alt="Pokemon Image"
				/>
				<div className="capitalize px-8">{props.pokemon.name}</div>
			</div>
			<div>{generateCountPercent(props.pokemon) + "%"}</div>
		</div>
	);
};

const generateCountPercent = (pokemon: PokemonQueryResult[number]) => {
	const { votesFor, votesAgainst } = pokemon._count;
	return votesFor || votesAgainst
		? (votesFor / (votesFor + votesAgainst)) * 100
		: 0;
};
