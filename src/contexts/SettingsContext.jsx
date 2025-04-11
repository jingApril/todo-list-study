import {createContext, useContext, useState} from "react";
const SettingsContext = createContext();

export const SettingsProvider = ({children}) => {
    const [hideCompleted, setHideCompleted] = useState(false);
     const handleToggleHideCompleted =() => {
        setHideCompleted((prev) => !prev);
     }
     const handleClearCompleted = () => {
      alert("清除功能由 Todos 页面处理");
    };
    return (
      <SettingsContext.Provider value={{
         hideCompleted,
         handleToggleHideCompleted,
         handleClearCompleted,
       }}>
        {children}
      </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);