import type { PageServerLoad } from "./$types";

let sessionId = 0;

export const load = (() => {
  return { id: sessionId++ };
}) satisfies PageServerLoad;
