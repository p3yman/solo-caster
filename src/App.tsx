import { Header } from "./components/Header";
import { Screen } from "./components/Screen";
import { SettingsContextProvider } from "./context/SettingsContext";

function App() {
  return (
    <SettingsContextProvider>
      <div className="dark bg-black p-0 text-white">
        <Header />
        <Screen />
      </div>
    </SettingsContextProvider>
  );
}

export default App;
