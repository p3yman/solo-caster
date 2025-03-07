import { useState } from "react";
import { Header } from "./components/Header";
import { Screen } from "./components/Screen";
import { OBSProvider } from "./context/OBSContext";
import { SettingsContextProvider } from "./context/SettingsContext";
import { createContext } from "react";

interface SheetContextType {
  sheetOn: boolean
  setSheetOn: React.Dispatch<React.SetStateAction<boolean>>
};

export const SheetContext = createContext<SheetContextType>({
  sheetOn: false,
  setSheetOn: () => {}
});

function App() {
  const [sheetOn, setSheetOn] = useState(false);
  
  return (
    <SettingsContextProvider>
      <OBSProvider>
        <div className="dark bg-black p-0 text-white">
        <SheetContext.Provider value={{ sheetOn, setSheetOn }}>
          <Header />
          <Screen />
        </SheetContext.Provider>
        </div>
      </OBSProvider>
    </SettingsContextProvider>
  );
}

export default App;
