import React, { useState, useEffect, createContext } from 'react';
export const UpButtonContext = createContext();

function UpButtonProvider({ children }) {
    const [visibility, setVisibility] = useState('hidden');
    const [opacity, setOpacity] = useState(0);
    useEffect(() => {
        const scroll = window.addEventListener('scroll', () => {
            if (window.scrollY > 800) {
                setVisibility('visible');
                setOpacity(1);
            } else {
                setVisibility('hidden');
                setOpacity(0);
            }
        });
        return window.removeEventListener('scroll', scroll);
    }, []);
    // const showButton = { visibility, opacity };
    // console.log('visibility', visibility);
    return (
        <UpButtonContext.Provider value={[visibility, opacity]}>
            {children}
        </UpButtonContext.Provider>
    );
}

export default UpButtonProvider;
