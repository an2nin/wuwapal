import Layout from "@/components/layouts/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    if (router.pathname === "/_error") return <Component {...pageProps} />;

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
