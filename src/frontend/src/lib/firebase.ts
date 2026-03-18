// Firebase removed — Internet Identity is used instead
export const auth = {
  currentUser: null as null | { uid: string; email: string },
};
export const db = {};
export async function saveFirestoreUser() {}
export async function getFirestoreUser() {
  return null;
}
export async function signInWithPhone(): Promise<{
  uid: string;
  isNew: boolean;
}> {
  throw new Error("Not implemented — use Internet Identity");
}
export async function signUpWithEmail(): Promise<{ uid: string }> {
  throw new Error("Not implemented — use Internet Identity");
}
export async function signInWithEmail(): Promise<{ uid: string }> {
  throw new Error("Not implemented — use Internet Identity");
}
export async function resetPassword(): Promise<void> {
  throw new Error("Not implemented — use Internet Identity");
}
export async function firebaseSignOut(): Promise<void> {}
export interface FirestoreUser {
  phone?: string;
  email?: string;
  wallet_balance: number;
  referral_code: string;
  username: string;
  created_at: unknown;
  last_login: unknown;
}
