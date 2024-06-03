import { useEffect, useRef, useState } from "react";
import Layout from "@/components/layouts/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/router";

import { Provider } from "react-redux";
import { persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "@/redux/store";

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    if (router.pathname === "/_error") return <Component {...pageProps} />;
    if (router.pathname.startsWith("/convene"))
        return (
            <Layout>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Toaster />
                        <Component {...pageProps} />
                    </PersistGate>
                </Provider>
            </Layout>
        );

    return (
        <Layout>
            <Toaster />
            <Component {...pageProps} />
        </Layout>
    );
}
