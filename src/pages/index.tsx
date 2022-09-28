import { trpc } from "@/utils/trpc";

export default function Home() {
	const { data, isLoading } = trpc.hello.useQuery({ text: "client" });

	if (isLoading) return <div>Loading...</div>;
	if (data) return <div>{data.greeting}</div>;
	return (
		<div className="h-screen w-screen flex flex-col justify-center items-center">
			<div className="text-2xl">Whick Pokémon is rounder?</div>
			<div className="p-2" />
			<div className="p-8 flex flex-row justify-between items-center max-w-2xl border rounded">
				<div className="w-16 h-16 bg-red-600">First</div>
				<div className="p-2">Vs</div>
				<div className="w-16 h-16 bg-red-600">Second</div>
			</div>
		</div>
	);
}
