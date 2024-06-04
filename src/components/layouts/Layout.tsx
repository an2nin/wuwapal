import Sidebar from "@/components/layouts/Sidebar";
import Header from "./Header";
import { Inter, VT323, Play } from "next/font/google";
import HeaderNew from "./HeaderNew";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main className={`flex flex-col justify-start ${inter.className}`}>
                <HeaderNew />
                <div className="container md:p-10 sm:pt-10 pt-5">
                    {children}
                </div>
            </main>
        </>
    );
}
