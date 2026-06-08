import GlobalBackground from "./BirthdayLayout/GlobalBackground";
import BirthdayController from "./BirthdayController";
import MusicPlayer from "./components/MusicPlayer";
import { MusicProvider } from "./context/MusicContext";

const App = () => {
  return (
    <MusicProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        <GlobalBackground />
        <BirthdayController />
        <MusicPlayer />
      </div>
    </MusicProvider>
  );
};

export default App;
