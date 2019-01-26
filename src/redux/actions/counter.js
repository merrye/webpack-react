export const INCREMENT = 'COUNTER_INCREMENT'
export const DECREMENT = 'COUNTER_DECREMENT'
export const RESET = 'COUNTER_RESET'

export function increment() {
  return { type: INCREMENT }
}

export function decrement() {
  return { type: DECREMENT }
}

export function reset() {
  return { type: RESET }
}
