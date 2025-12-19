import { createContext, useState } from "react";


interface NavBarContextType {
    isMobile: boolean;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const NavBarContext = createContext<NavBarContextType | undefined>(undefined);

export const NavBarProvider = ({
    children,
    isMobile,
}: {
    children: React.ReactNode;
    isMobile: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <NavBarContext.Provider value={{ isMobile, isOpen, setIsOpen }}>
            {children}
        </NavBarContext.Provider>
    );
}
