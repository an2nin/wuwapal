import { Calendar, Combine, Globe, Sparkles } from "lucide-react";

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
    Convene: [
        {
            title: "Convene Tracker",
            path: "/convene",
            match: "/convene",
            icon: <Sparkles className="size-5" />,
        },
        {
            title: "Collector's Hub",
            path: "/collectors-hub",
            match: "/collectors-hub",
            icon: <Combine className="size-5" />,
        },
        // {
        //     title: "Global Stats",
        //     path: "/global-stats",
        //     match: "/global-stats",
        //     icon: <Globe className="size-5" />,
        // },
    ],
    // Planner: [
    //     {
    //         title: "Timeline",
    //         path: "/timeline",
    //         match: "/timeline",
    //         icon: <Calendar className="size-5" />,
    //     },
    // ],
};
