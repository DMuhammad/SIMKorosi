import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const NavigationContext = createContext(0);

export const NavigationProvider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <NavigationContext.Provider value={{ currentIndex, setCurrentIndex }}>
      {children}
    </NavigationContext.Provider>
  );
};

NavigationProvider.propTypes = {
  children: PropTypes.any,
};
