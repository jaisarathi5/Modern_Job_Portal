/**
 * Every "Sort by" control in the portal renders from this list and writes to the
 * single `sortBy` value owned by JobContext, so the results header and the filter
 * panel can never show — or apply — a different order.
 *
 * `requiresAuth: true` marks an option that depends on the signed-in candidate's
 * own skill profile. Guests are not shown these, because offering a "sort by my
 * match %" they can never see would only be confusing.
 */
export const JOB_SORT_OPTIONS = [
  { value: 'match', label: '🎯 Highest Skill Match %', requiresAuth: true },
  { value: 'recent', label: '⏱️ Most Recently Posted' },
  { value: 'applicants', label: '👥 Fewest Applicants (Early Apply)' },
  { value: 'title', label: '🔤 Alphabetical (Title)' }
];

/** Sort options a visitor is allowed to pick, given whether they are signed in. */
export const getSortOptions = (isSignedIn) =>
  JOB_SORT_OPTIONS.filter((option) => !option.requiresAuth || isSignedIn);
