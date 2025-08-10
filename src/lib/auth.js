import { auth } from './firebase';
import { signOut, updateProfile } from 'firebase/auth';

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

googleProvider.addScope('email');
googleProvider.addScope('profile');

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signUpWithEmail = async (email, password, nickname) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: nickname });
    return { user: result.user };
  } catch (error) {
    let errorMessage = 'Невідома помилка';

    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Користувач з таким email вже існує';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Невірний формат email';
        break;
      case 'auth/weak-password':
        errorMessage = 'Пароль занадто слабкий (мінімум 6 символів)';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'Реєстрація через email вимкнена';
        break;
      default:
        errorMessage = error.message;
    }

    return { error: errorMessage };
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user };
  } catch (error) {
    let errorMessage = 'Невідома помилка';

    switch (error.code) {
      case 'auth/invalid-credential':
        errorMessage = 'Невірний email або пароль';
        break;
      case 'auth/user-not-found':
        errorMessage = 'Користувача з таким email не знайдено';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Невірний пароль';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Забагато спроб входу. Спробуйте пізніше';
        break;
      default:
        errorMessage = error.message;
    }

    return { error: errorMessage };
  }
};

export const signOutUser = async () => {
  await signOut(auth);
};
