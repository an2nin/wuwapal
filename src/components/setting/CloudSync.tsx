import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function CloudSync() {
    return (
        <Card className="px-10 py-5">
            <CardHeader>
                <CardTitle>Cloud Sync</CardTitle>
                <CardDescription className="max-w-2xl mt-2">
                    Easily save and access your data across all your devices
                    with your Google Account. Just log in, and click the
                    <span className="font-bold mx-1 text-accent">
                        Sync Data
                    </span>
                    button to import or export your information.
                </CardDescription>
            </CardHeader>
        </Card>
    );
}
