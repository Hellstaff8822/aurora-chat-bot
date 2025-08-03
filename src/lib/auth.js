import { auth } from './firebase';
import { signOut, updateProfile } from 'firebase/auth';

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user };
  } catch (error) {
    console.error('Помилка входу через Google:', error.message);
    return { error: error.message };
  }
};

export const signUpWithEmail = async (email, password, nickname) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: nickname });
    return { user: result.user };
  } catch (error) {
    console.error('Помилка реєстрації:', error.message);
    return { error: error.code };
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user };
  } catch (error) {
    console.error('Помилка входу:', error.message);
    return { error: error.code };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Помилка виходу:', error.message);
    throw error;
  }
};
