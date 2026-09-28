import { INITIAL_JOBS } from './initialJobs';
import { BRANCH_JOBS_A } from './branchJobsA';
import { BRANCH_JOBS_B } from './branchJobsB';
import { BRANCH_JOBS_C1 } from './branchJobsC1';
import { BRANCH_JOBS_C2 } from './branchJobsC2';
import { MNC_JOBS } from './mncJobs';

/** All jobs: branch flagships first, then legacy software jobs. */
export const ALL_SEED_JOBS = [...MNC_JOBS, ...BRANCH_JOBS_A, ...BRANCH_JOBS_B, ...BRANCH_JOBS_C1, ...BRANCH_JOBS_C2, ...INITIAL_JOBS];
