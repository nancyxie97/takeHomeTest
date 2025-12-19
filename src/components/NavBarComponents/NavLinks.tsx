//Navigation route links in both mobile and desktop
import { NAVIGATION_CONFIG } from '@/data/NavigationConfig'
import { useNavBar } from '@/hooks/useNavBar'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import { Link } from '@tanstack/react-router'

const NavLinks = () => {
    const { isMobile, isOpen, setIsOpen } = useNavBar();
    const navContainerStyle = isMobile
        ? "fixed top-0 right-0 w-64 h-full p-6 shadow-lg z-50 flex flex-col gap-4"
        : "flex gap-4"

    const baseLinkStyle = `
      font-medium
      transition-all duration-300 ease-out
      data-[status=active]:text-accent
    `

    const mobileLinkStyle = `
      px-3 py-2 rounded-md text-base
      hover:bg-foreground/50 hover:text-foreground
      dark:hover:bg-foreground-muted
      data-[status=active]:bg-accent/50
    `

    const desktopLinkStyle = `
      relative px-3 py-1 rounded-full text-sm
      border border-transparent
      hover:border-foreground/50
      hover:text-foreground
      dark:hover:border-foreground-muted
      data-[status=active]:border-accent/50
    `

    const linkStyle = `${baseLinkStyle} ${isMobile ? mobileLinkStyle : desktopLinkStyle
        }`

    return (
        <nav className={navContainerStyle}>
            {isMobile && <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen && <XMarkIcon className="h-6 w-6" />}
            </button>}
            {NAVIGATION_CONFIG.map((item) => (
                <Link
                    key={item.id}
                    to={item.route}
                    activeOptions={{ exact: false }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={linkStyle}
                >
                    {item.name}
                </Link>
            ))}
        </nav>
    )
}

export default NavLinks