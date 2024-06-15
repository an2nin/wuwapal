import Link from "next/link";
import React from "react";

export default function PrivacyPolicy() {
    return (
        <div className="flex flex-col gap-5 justify-center items-center">
            <div className="max-w-2xl flex flex-col gap-3">
                <h1 className="text-5xl font-bold">Privacy Policy</h1>
                <p className="text-muted-foreground text-sm">
                    Your privacy is of utmost importance to us. This privacy
                    policy document describes the various types of personal
                    information gathered and collected by WuWa Pal and how this
                    information is utilized.
                </p>
            </div>
            <div className="max-w-2xl flex flex-col gap-3">
                <h2 className="text-3xl font-bold">Browser Local Storage</h2>
                <p className="text-muted-foreground text-sm flex flex-col">
                    WuWa Pal uses browser local storage to store application
                    data. This allows us to save data directly on your device,
                    providing a more seamless and responsive user experience.
                    <span className="my-2">
                        The data saved in the browser&apos;s local storage helps
                        track your preferences and settings, enabling us to
                        deliver a personalized experience each time you use our
                        application. This information remains on your device and
                        is not transmitted to our servers.
                    </span>
                    <span>
                        By using WuWa Pal, you agree to the use of local storage
                        for storing application data. You can clear your
                        browser&apos;s local storage at any time via the{" "}
                        <Link
                            className="text-white font-bold underline"
                            href="/settings"
                        >
                            Settings 
                        </Link>{" "}
                        page or your browser settings, which will delete any data
                        associated with WuWa Pal.
                    </span>
                </p>
            </div>
            <div className="max-w-2xl flex flex-col gap-3">
                <h2 className="text-3xl font-bold">Analytics</h2>
                <p className="text-muted-foreground text-sm flex flex-col">
                    WuWa Pal uses Cloudflare Analytics to gather and analyze
                    data regarding how our application is utilized. This
                    information assists us in understanding user behavior,
                    enhancing our application, and improving the user
                    experience.
                    <span className="my-2">
                        Cloudflare Analytics collects data such as page views,
                        and other interactions within the application. This data
                        is anonymized and aggregated, ensuring that it does not
                        personally identify individual users.
                    </span>
                    <span>
                        By using WuWa Pal, you consent to the collection and use
                        of information by Cloudflare Analytics to improve our
                        application. The data collected through Cloudflare
                        Analytics is exclusively used for analytics purposes and
                        is not shared with third parties.
                    </span>
                </p>
            </div>
            <div className="max-w-2xl flex flex-col gap-3">
                <h2 className="text-3xl font-bold">Supabase Database</h2>
                <p className="text-muted-foreground text-sm flex flex-col">
                    WuWa Pal utilizes Supabase for database services to store
                    user&apos;s Convene data. This information serves backup
                    purposes and enhances application features to deliver a
                    superior user experience.
                    <span className="my-2">
                        Data stored in the Supabase database includes your
                        Convene History URL. This data is strictly used to
                        improve user welfare and application functionality, and
                        it is securely stored and managed. Supabase implements
                        industry-standard security measures to safeguard your
                        data.
                    </span>
                    <span>
                        By using WuWa Pal, you agree to the utilization of
                        Supabase database services for storing your data. We are
                        dedicated to ensuring the security of your data and
                        using it solely to enhance your experience with WuWa
                        Pal.
                    </span>
                </p>
            </div>
            <div className="max-w-2xl flex flex-col gap-3">
                <h2 className="text-3xl font-bold">
                    Changes to This Privacy Policy
                </h2>
                <p className="text-muted-foreground text-sm flex flex-col">
                    Our Privacy Policy may undergo updates periodically. It is
                    recommended that you regularly review this Privacy Policy
                    for any changes. Changes to the Privacy Policy become
                    effective immediately upon being posted on this page.
                </p>
            </div>
        </div>
    );
}
