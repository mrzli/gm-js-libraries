import { AuthorizationHeader } from '../types/authorization-header';

export function createAuthorizationHeader(
  githubToken: string
): AuthorizationHeader {
  return { authorization: `token ${githubToken}` };
}

// export async function tryCatchGraphQl<T>(call: () => Promise<T>): Promise<T> {
//   try {
//     return await call();
//   } catch (error) {
//     const messages: readonly string[] = error.errors.map(
//       (e: Error) => e.message
//     );
//     messages.forEach((message) => {
//       console.error(message);
//     });
//     throw error;
//   }
// }

export async function tryCatch<T>(call: () => Promise<T>): Promise<T> {
  try {
    return await call();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
