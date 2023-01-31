export function rupeetoDollar(rupee) {
  let dollar = 0.0122401 * rupee;
  return (Math.round(dollar * 1000) / 1000).toFixed(2);
}

export function Dollartorupee(dollar) {
  let rupee = 81.698407 * dollar;
  return (Math.round(rupee * 1000) / 1000).toFixed(2);
}
