import Header from "@/components/layouts/Header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main className={`flex flex-col justify-start ${inter.className}`}>
                <Header />
                <div className="container md:p-10 sm:pt-10 pt-5">
                    {children}
                </div>
            </main>
        </>
    );
}
