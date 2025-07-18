export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('chatState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state', err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const stateToSave = {
      threads: state.threads,
      chat: state.chat,
    };
    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem('chatState', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};
