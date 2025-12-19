import { NavBarContext } from "@/provider/NavBarProvider";
import { useContext } from "react";


export const useNavBar = () => {
    const context = useContext(NavBarContext);
    if (!context) throw new Error("Please use navBarProvider with useNavBar hook");
    return context;
};