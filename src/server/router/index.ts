import { initTRPC } from '@trpc/server';
import { PokemonClient } from 'pokenode-ts';
import { z } from 'zod';
import { prisma } from '@/server/utils/prisma';
export const t = initTRPC.create();

export const appRouter = t.router({
  getPokemonById: t.procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      await prisma.$connect();
      const pokemon = await prisma.pokemon.findFirst({ where: { id: input.id } });

      if (!pokemon) throw new Error("Pokemon doens't exist");
      return pokemon;
    }),
  castVote: t.procedure
    .input(z.object({ votedForId: z.number(), votedAgainstId: z.number() }))
    .mutation(async ({ input }) => {
      await prisma.$connect();
      const voteInDb = await prisma.vote.create({
        data: {
          ...input
        }
      });
      return { success: true, vote: voteInDb };
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;

