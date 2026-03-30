import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getFirebaseDb } from "./firebase";

export interface FirestoreUserProfile {
  principal: string;
  display_name: string;
  freefire_uid: string;
  freefire_nickname: string;
  freefire_level: number;
  wallet_balance: number;
  referral_code: string;
  created_at: number;
  referred_by?: string;
  referral_earnings?: number;
  welcome_bonus?: number;
}

export async function getUserProfile(
  userId: string,
): Promise<FirestoreUserProfile | null> {
  try {
    const db = getFirebaseDb();
    const snap = await getDoc(doc(db, "users", userId));
    if (snap.exists()) return snap.data() as FirestoreUserProfile;
    return null;
  } catch {
    return null;
  }
}

export async function saveUserProfile(
  userId: string,
  profile: FirestoreUserProfile,
): Promise<void> {
  const db = getFirebaseDb();
  await setDoc(doc(db, "users", userId), profile, { merge: true });
}

export async function updateWalletBalance(
  userId: string,
  delta: number,
): Promise<void> {
  const db = getFirebaseDb();
  const userRef = doc(db, "users", userId);
  const snap = await getDoc(userRef);
  if (snap.exists()) {
    const current = (snap.data() as FirestoreUserProfile).wallet_balance ?? 0;
    await updateDoc(userRef, { wallet_balance: current + delta });
  }
}

export async function addTransaction(
  userId: string,
  tx: {
    type: "credit" | "debit";
    amount: number;
    description: string;
  },
): Promise<void> {
  try {
    const db = getFirebaseDb();
    await addDoc(collection(db, "transactions"), {
      userId,
      ...tx,
      date: serverTimestamp(),
    });
  } catch {
    /* ignore */
  }
}

export async function getUserTransactions(userId: string) {
  try {
    const db = getFirebaseDb();
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", userId),
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch {
    return [];
  }
}

export async function findUserByReferralCode(
  code: string,
): Promise<FirestoreUserProfile | null> {
  try {
    const db = getFirebaseDb();
    const q = query(
      collection(db, "users"),
      where("referral_code", "==", code.toUpperCase()),
    );
    const snap = await getDocs(q);
    if (!snap.empty) return snap.docs[0].data() as FirestoreUserProfile;
    return null;
  } catch {
    return null;
  }
}

export interface FreeRegistration {
  id?: string;
  nickname: string;
  uid: string;
  tournamentId: string;
  tournamentName: string;
  registeredAt: number;
}

export async function saveFreeRegistration(data: {
  nickname: string;
  uid: string;
  tournamentId: string;
  tournamentName: string;
  registeredAt: number;
}): Promise<void> {
  try {
    const db = getFirebaseDb();
    await addDoc(collection(db, "freeRegistrations"), data);
  } catch {
    /* ignore */
  }
}

export async function getFreeRegistrations(): Promise<FreeRegistration[]> {
  try {
    const db = getFirebaseDb();
    const q = query(
      collection(db, "freeRegistrations"),
      orderBy("registeredAt", "desc"),
    );
    const snap = await getDocs(q);
    return snap.docs.map(
      (d) => ({ id: d.id, ...d.data() }) as FreeRegistration,
    );
  } catch {
    return [];
  }
}

export interface PaidRegistration {
  id?: string;
  nickname: string;
  uid: string;
  tournamentId: string;
  tournamentName: string;
  paymentStatus: "Success" | "Failed" | "Pending";
  registeredAt: number;
  transactionId: string;
}

export async function savePaidRegistration(
  data: Omit<PaidRegistration, "id">,
): Promise<void> {
  try {
    const db = getFirebaseDb();
    await addDoc(collection(db, "paid_registrations"), {
      ...data,
      registeredAt: data.registeredAt || Date.now(),
    });
  } catch {
    /* ignore */
  }
}

export async function getPaidRegistrations(): Promise<PaidRegistration[]> {
  try {
    const db = getFirebaseDb();
    const q = query(
      collection(db, "paid_registrations"),
      orderBy("registeredAt", "desc"),
    );
    const snap = await getDocs(q);
    return snap.docs.map(
      (d) => ({ id: d.id, ...d.data() }) as PaidRegistration,
    );
  } catch {
    return [];
  }
}
