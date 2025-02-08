import { Header } from "./components/Header";
import { Screen } from "./components/Screen";
import { SettingsContextProvider } from "./context/SettingsContext";

function App() {
  return (
    <SettingsContextProvider>
      <div className="flex h-screen w-screen items-center justify-center bg-black text-white">
        <Header />
        <Screen />
      </div>
    </SettingsContextProvider>
  );
}

export default App;
