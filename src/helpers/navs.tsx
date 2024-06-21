import { LayoutGrid, Sparkles } from "lucide-react";
import { GiSwordTie } from "react-icons/gi";
export const navs = [
    {
        title: "Home",
        href: "/",
        icon: <LayoutGrid />,
    },
    {
        title: "Convene Tracker",
        href: "/convene",
        icon: <Sparkles />,
    },
    {
        title: "My Collections",
        href: "/my-collections",
        icon: <GiSwordTie />,
    },
];
