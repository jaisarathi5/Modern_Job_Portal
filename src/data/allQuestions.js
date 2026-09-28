import { QUESTION_BANK } from './questions';
import { ENGINEERING_QUESTIONS_A } from './engineeringQuestionsA';
import { ENGINEERING_QUESTIONS_B } from './engineeringQuestionsB';

/** Full bank: legacy software questions + multi-branch engineering domain questions. */
export const MERGED_QUESTION_BANK = [...QUESTION_BANK, ...ENGINEERING_QUESTIONS_A, ...ENGINEERING_QUESTIONS_B];
