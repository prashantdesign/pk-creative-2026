import type { RawPost } from '../types';
import { INDUSTRIES_1 } from './industries-1';

/** Additional articles per category slug. Add a new batch file, import it here and list it under its category. */
export const BATCHES: Record<string, RawPost[]> = {
  industries: [...INDUSTRIES_1],
};
