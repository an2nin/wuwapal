import Link from "next/link";

export default function Announcement() {
    return (
        <div className="w-full container text-center p-1 text-sm">
            <p>
                Cloud Sync functionality is now live. Please navigate to
                <Link href="/settings">
                    <span className="font-bold mx-1 underline">Settings</span>
                    page to initiate the backup of your data to the cloud.
                </Link>
            </p>
        </div>
    );
}
