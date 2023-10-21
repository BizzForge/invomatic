import React, { useState } from 'react';

const TitleContext = React.createContext();

export default function ContextProvider({ children }) {
  const [title, setTitle] = useState('');

  const setTitleFromEvent = (newTitle) => {
    setTitle(newTitle);
  };

  return (
    <TitleContext.Provider value={{ title, setTitleFromEvent }}>
      {children}
    </TitleContext.Provider>
  );
}