import type { RawPost } from '../types';
import { INDUSTRIES_1 } from './industries-1';
import { INDUSTRIES_2 } from './industries-2';
import { INDUSTRIES_3 } from './industries-3';
import { HOWTO_1 } from './howto-1';

/** Additional articles per category slug. Add a new batch file, import it here and list it under its category. */
export const BATCHES: Record<string, RawPost[]> = {
  'how-to': [...HOWTO_1],
  industries: [...INDUSTRIES_1, ...INDUSTRIES_2, ...INDUSTRIES_3],
};
