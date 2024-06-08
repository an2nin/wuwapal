import Layout from "@/components/layouts/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/router";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { api } from "@/redux/api/base";

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    if (router.pathname === "/_error") return <Component {...pageProps} />;
    return (
        <Layout>
            <ApiProvider api={api}>
                <Toaster />
                <Component {...pageProps} />
            </ApiProvider>
        </Layout>
    );
}
