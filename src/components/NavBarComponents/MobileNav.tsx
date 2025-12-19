
import NavLinks from './NavLinks';
import LightDarkModeToggle from '../LightDarkModeToggle';
import { useNavBar } from '@/hooks/useNavBar';

const MobileNav = () => {
    const { isMobile, isOpen } = useNavBar();

    if (!isMobile || !isOpen) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div className="fixed top-0 right-0 w-64 h-full bg-background p-6 shadow-lg z-50 flex flex-col gap-4">
                <NavLinks />
                <div className="mt-auto">
                    <LightDarkModeToggle />
                </div>
            </div>
        </div>
    );
};

export default MobileNav