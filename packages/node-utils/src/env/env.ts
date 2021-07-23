import process from 'process';

export function getEnv(key: string): string | undefined {
  return process.env[key];
}

export function getEnvOrThrow(key: string): string {
  const value = getEnv(key);
  if (!value) {
    throw new Error(`Environmental variable '${key}' not set.`);
  }

  return value;
}
