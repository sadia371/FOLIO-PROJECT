export async function simulateGeneration<T>(data: T, delayMs = 1800): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return data;
}
