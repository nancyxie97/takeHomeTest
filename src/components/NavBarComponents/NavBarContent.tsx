import EngineersGateLogo from '@/assets/EngineersGateLogo';
import { useNavBar } from '@/hooks/useNavBar';
import { Bars3Icon } from '@heroicons/react/24/outline';
import NavLinks from './NavLinks';
import LightDarkModeToggle from '../LightDarkModeToggle';

const MobileMenuToggle = () => {
    const { isOpen, setIsOpen } = useNavBar();
    return (
        <button onClick={() => setIsOpen(!isOpen)}>
            {!isOpen && <Bars3Icon className="h-6 w-6" />}
        </button>
    );
};
const NavBarContent = () => {
    const { isMobile } = useNavBar();

    return (
        <div className="flex items-center justify-between w-full p-4 bg-background text-foreground shadow-navbar backdrop-blur border-b border-border">
            <EngineersGateLogo className="h-10 fill-[#00458a] dark:fill-slate-100" />

            {isMobile ? (
                <MobileMenuToggle />
            ) : (
                <div className="flex items-center gap-6">
                    <NavLinks />
                    <LightDarkModeToggle />
                </div>
            )}
        </div>
    );
};

export default NavBarContent