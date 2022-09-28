import { initTRPC } from '@trpc/server';
import { PokemonClient } from 'pokenode-ts';
import { z } from 'zod';

export const t = initTRPC.create();

export const appRouter = t.router({
  getPokemonById: t.procedure
    .input(
      z
        .object({
          id: z.number()
        }),
    )
    .query(async ({ input }) => {
      const api = new PokemonClient();
      const pokemon = await api.getPokemonById(input.id);
      return pokemon;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

