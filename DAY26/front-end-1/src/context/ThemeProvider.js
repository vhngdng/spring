import React, { useState, createContext } from 'react';
export const ThemeContext = createContext();

function ThemeProvider({ children }) {
    // eslint-disable-next-line no-unused-vars
    const [theme, setTheme] = useState(true);

    function changeTheme() {
        setTheme(!theme);
    }

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;
