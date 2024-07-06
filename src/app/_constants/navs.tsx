import { Calendar, Combine, Globe, Home, Sparkles } from "lucide-react";

interface NavItem {
    title: string;
    path: string;
    match: string;
    icon: React.ReactNode;
}

interface Navs {
    [category: string]: NavItem[];
}

export const NAVS: Navs = {
    "": [
        {
            title: "Home",
            path: "/",
            match: "/",
            icon: <Home className="w-7 h-7" />,
        },
    ],
    Tools: [
        {
            title: "Convene Tracker",
            path: "/convene",
            match: "/convene",
            icon: <Sparkles className="w-7 h-7" />,
        },
        // {
        //     title: "Collector's Hub",
        //     path: "/collectors-hub",
        //     match: "/collectors-hub",
        //     icon: <Combine className="w-7 h-7" />,
        // },
        // {
        //     title: "Global Stats",
        //     path: "/pull/global",
        //     match: "/pull/global",
        //     icon: <Globe className="w-7 h-7" />,
        // },
        // {
        //     title: "Timeline",
        //     path: "/timeline",
        //     match: "/timeline",
        //     icon: <Calendar className="w-7 h-7" />,
        // },
    ],
};
