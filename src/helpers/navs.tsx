import { LayoutGrid, Sparkles } from "lucide-react";
import { GiSwordTie } from "react-icons/gi";
export const navs = [
    {
        title: "Home",
        href: "/",
        icon: <LayoutGrid className="h-5 w-5" />,
    },
    {
        title: "Convene Tracker",
        href: "/convene",
        icon: <Sparkles className="h-5 w-5" />,
    },
    {
        title: "My Collections",
        href: "/my-collections",
        icon: <GiSwordTie className="h-5 w-5" />,
    },
];
