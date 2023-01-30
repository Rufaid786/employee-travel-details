export function rupeetoDollar(rupee) {
  let dollar = 0.0122728 * rupee;
  return Math.round(dollar * 1000) / 1000;
}
