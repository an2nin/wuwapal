import Header from "@/components/layouts/Header";
import {
    Inter,
} from "next/font/google";
import Footer from "@/components/layouts/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main
                className={`flex flex-col min-h-screen justify-start ${inter.className}`}
            >
                <Header />
                <div className="flex-1 container md:px-10 sm:pt-10 py-10">
                    {children}
                </div>
                <Footer />
            </main>
        </>
    );
}
