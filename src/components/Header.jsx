import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMute } from "../features/soundSlice";
import { toggleTheme } from "../features/themeSlice";
import { playSound } from "../utils/soundPlayer";
import soundIcon from "../assets/images/icon-sound.svg"
import muteIcon from "../assets/images/icon-mute.svg"
import sunIcon from "../assets/images/icon-sun.svg";
import moonIcon from "../assets/images/icon-moon.svg";

export default function Header() {
  const muted = useSelector((state) => state.sound.muted);
  const inDarkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", inDarkMode);
    document.documentElement.style.colorScheme = inDarkMode ? "dark" : "light";
  }, [inDarkMode]);

  return (
    <header className="flex justify-between items-center mb-[clamp(.15rem,1vw,.85rem)]">
      <h1 className="main-title-typography">Todo</h1>

      <div className="flex items-center gap-3">
        <label className="swap w-[clamp(1.25rem,2vw,1.625rem)] mt-2">
          <input type="checkbox" checked={muted}onChange={() => { dispatch(toggleMute()); playSound("soundToggle") }} aria-label={muted ? "Unmute" : "Mute"} />
          <img className="swap-off fill-current" src={soundIcon} alt="sound on" aria-hidden="true" />
          <img className="swap-on fill-current" src={muteIcon} alt="sound off" aria-hidden="true" />
        </label>

        <label className="swap swap-rotate w-[clamp(1.25rem,2vw,1.625rem)] mt-2">
          <input className="theme-controller" type="checkbox" checked={inDarkMode} onChange={() => { dispatch(toggleTheme()); playSound("themeToggle") }} aria-label={inDarkMode ? "Switch to light mode" : "Switch to dark mode"} />
          <img className="swap-off fill-current" src={sunIcon} alt="sun icon" aria-hidden="true" />
          <img className="swap-on fill-current" src={moonIcon} alt="moon icon" aria-hidden="true" />
        </label>
      </div>
    </header>
  );
}
