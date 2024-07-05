import { BoomBox, Calendar, Combine, Globe, LayoutGrid } from "lucide-react";

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
            icon: <LayoutGrid className="w-5 h-5" />,
        },
    ],
    // Tools: [
    //     {
    //         title: "Pull Tracker",
    //         path: "/pull",
    //         match: "/pull",
    //         icon: <BoomBox className="w-5 h-5" />,
    //     },
    //     {
    //         title: "Collector's Hub",
    //         path: "/collectors-hub",
    //         match: "/collectors-hub",
    //         icon: <Combine className="w-5 h-5" />,
    //     },
    //     {
    //         title: "Global Stats",
    //         path: "/pull/global",
    //         match: "/pull/global",
    //         icon: <Globe className="w-5 h-5" />,
    //     },
    //     {
    //         title: "Timeline",
    //         path: "/timeline",
    //         match: "/timeline",
    //         icon: <Calendar className="w-5 h-5" />,
    //     },
    // ],
};
