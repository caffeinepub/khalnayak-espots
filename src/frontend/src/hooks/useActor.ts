import { useActor as useActorBase } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";
import type { Backend } from "../backend";

export function useActor(): { actor: Backend | null; isFetching: boolean } {
  return useActorBase(createActor);
}
