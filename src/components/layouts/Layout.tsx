import Sidebar from "@/components/layouts/Sidebar";
import Header from "./Header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div
            className={`grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ${inter.className}`}
        >
            {/* Left column */}
            <Sidebar />

            {/* Right column */}
            <main className="flex flex-col justify-start">
                <Header />
                <div className="container mx-auto md:p-10">{children}</div>
            </main>
        </div>
    );
}
