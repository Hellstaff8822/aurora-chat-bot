import { auth } from './firebase';
import { signOut } from 'firebase/auth';

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
    console.log('Успішний вхід через Google:', result.user);
    return { user: result.user };
  } catch (error) {
    console.error('Помилка входу через Google:', error.message);
    return { error: error.message };
  }
};

export const signUpWithEmail = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log('Успішна реєстрація:', result.user);
    return { user: result.user };
  } catch (error) {
    console.error('Помилка реєстрації:', error.message);
    return { error: error.code };
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log('Успішний вхід:', result.user);
    return { user: result.user };
  } catch (error) {
    console.error('Помилка входу:', error.message);
    return { error: error.code };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('Користувач вийшов з системи');
  } catch (error) {
    console.error('Помилка виходу:', error.message);
  }
};
