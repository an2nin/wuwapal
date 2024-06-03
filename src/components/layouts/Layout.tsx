import Sidebar from "@/components/layouts/Sidebar";
import Header from "./Header";
import { Inter, VT323, Play } from "next/font/google";
import HeaderNew from "./HeaderNew";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* <div
            className={`grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ${inter.className}`}
        >
            <Sidebar />

            <main className="flex flex-col justify-start">
                <Header />
                <div className="container mx-auto md:p-10 sm:pt-10 pt-5">{children}</div>
            </main>
        </div> */}
            <main className="flex flex-col justify-start">
                <HeaderNew />
                <div className="container mx-auto md:p-10 sm:pt-10 pt-5">
                    {children}
                </div>
            </main>
        </>
    );
}
