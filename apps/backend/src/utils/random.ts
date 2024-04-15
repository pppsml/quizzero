export function randomNumber(min: number = 0, max: number = 100): number {
  return Math.round(Math.random() * (max - min) + min)
}