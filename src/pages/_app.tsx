import { useEffect, useState } from "react";
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
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (router.pathname === "/_error") return <Component {...pageProps} />;

    // Render nothing on the server and during initial hydration
    if (!isMounted) return null;

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Layout>
                    <Toaster />
                    <Component {...pageProps} />
                </Layout>
            </PersistGate>
        </Provider>
    );
}