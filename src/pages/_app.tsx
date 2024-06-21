import Layout from "@/components/layouts/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { api } from "@/redux/api/base";
import { CookiesProvider } from "react-cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "@/components/ui/sonner";
export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    if (router.pathname === "/_error") return <Component {...pageProps} />;
    return (
        <Layout>
            <ApiProvider api={api}>
                <GoogleOAuthProvider
                    clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
                >
                    <CookiesProvider defaultSetOptions={{ path: "/" }}>
                        <Toaster richColors />
                        <Component {...pageProps} />
                    </CookiesProvider>
                </GoogleOAuthProvider>
            </ApiProvider>
        </Layout>
    );
}
