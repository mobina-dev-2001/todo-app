export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (!serializedState) return undefined;
    const parsedState = JSON.parse(serializedState);
    return {
      sound: parsedState.sound || { muted: false },
      theme: parsedState.theme || { darkMode: false },
      todo: parsedState.todo || { todos: [] },
    };
  } catch (err) {
    console.error("Failed to load state:", err);
    return undefined;
  }
};

let saveTimeout;
export const saveState = (state) => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    try {
      const toSave = {
        sound: state.sound,
        theme: state.theme,
        todo: {
          todos: state.todo.todos,
        },
      };
      localStorage.setItem("state", JSON.stringify(toSave));
    } catch (err) {
      console.error("Failed to save state:", err);
    }
  }, 500);
};
