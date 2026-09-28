/**
 * Estimate upper annual salary in LPA (Lakhs Per Annum) from arbitrary salary strings.
 * Examples:
 *   "INR 18 - 28 LPA" -> 28
 *   "₹6,00,000 - ₹8,50,000 / year" -> 8.5
 *   "₹25,000 - ₹35,000 / month Stipend" -> 4.2  (35,000 * 12 / 100,000)
 *   "₹14 LPA" -> 14
 */
export function estimateSalaryLPA(salary = '') {
  if (!salary) return 0;
  const isLPA = /lpa/i.test(salary);
  const isMonthly = /month|stipend/i.test(salary);

  const cleaned = String(salary).replace(/[₹,]/g, '');
  const nums = cleaned.match(/\d+(?:\.\d+)?/g);
  if (!nums || nums.length === 0) return 0;

  const top = Number(nums[nums.length - 1]);
  if (isNaN(top)) return 0;

  if (isLPA) {
    return top;
  }
  if (isMonthly) {
    return (top * 12) / 100000;
  }
  // Assume full amount in INR if >= 10000 (e.g. 850000 -> 8.5 LPA)
  if (top >= 10000) {
    return top / 100000;
  }
  return top;
}
