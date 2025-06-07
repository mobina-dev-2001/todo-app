import { Howl } from "howler";
import { store } from "../app/store";

const BASE_PATH = import.meta.env.BASE_URL;

const sounds = {
  addTask: new Howl({ src: [`${BASE_PATH}sounds/add_task.mp3`] }),
  deleteTask: new Howl({ src: [`${BASE_PATH}sounds/delete_task.mp3`] }),
  dragEnd: new Howl({ src: [`${BASE_PATH}sounds/drag_end.mp3`] }),
  dragStart: new Howl({ src: [`${BASE_PATH}sounds/drag_start.mp3`] }),
  editTask: new Howl({ src: [`${BASE_PATH}sounds/edit_task.mp3`] }),
  filterTask: new Howl({ src: [`${BASE_PATH}sounds/filter_task.mp3`] }),
  modalPopup: new Howl({ src: [`${BASE_PATH}sounds/modal_popup.mp3`] }),
  soundToggle: new Howl({ src: [`${BASE_PATH}sounds/sound_toggle.mp3`] }),
  taskStatusToggle: new Howl({ src: [`${BASE_PATH}sounds/task_status_toggle.mp3`] }),
  themeToggle: new Howl({ src: [`${BASE_PATH}sounds/theme_toggle.mp3`] }),
};

let isMuted = store.getState().sound.muted;

store.subscribe(() => {
  isMuted = store.getState().sound.muted;
});

export const playSound = (name) => {
  if (!isMuted && sounds[name]) {
    try {
      sounds[name].play();
    } catch (err) {
      console.error("Failed to play sound:", err);
    }
  }
};
