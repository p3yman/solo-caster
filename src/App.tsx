import { Header } from "./components/Header";
import { Screen } from "./components/Screen";
import { OBSProvider } from "./context/OBSContext";
import { SettingsContextProvider } from "./context/SettingsContext";

function App() {
  return (
    <SettingsContextProvider>
      <OBSProvider>
        <div className="dark bg-black p-0 text-white">
          <Header />
          <Screen />
        </div>
      </OBSProvider>
    </SettingsContextProvider>
  );
}

export default App;
