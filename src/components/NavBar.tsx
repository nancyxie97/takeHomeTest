
import useResize from "@/hooks/useResize";
import { NavBarProvider } from "@/provider/NavBarProvider";
import NavBarContent from "./NavBarComponents/NavBarContent";
import MobileNav from "./NavBarComponents/MobileNav";


const NavBar = () => {
    const { width } = useResize();
    const isMobile = width < 1024;

    return (
        <NavBarProvider isMobile={isMobile}>
            <NavBarContent />
            <MobileNav />
        </NavBarProvider>
    );
};

export default NavBar;
