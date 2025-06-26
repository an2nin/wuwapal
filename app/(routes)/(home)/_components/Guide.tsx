'use client'
import CustomList from "@/shared/components/layout/CustomList";
import CustomListItem from "@/shared/components/layout/CustomListItem";
import { Button } from "@/shared/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import { Eye, Import, RefreshCcw } from "lucide-react";
import { useRouter } from "next-nprogress-bar";

export default function Guide() {
    const router = useRouter()
    return (
        <Card className="flex flex-col justify-between">
            <CardHeader>
                <CardTitle>Get Started</CardTitle>
                <CardDescription>
                    Hello, fellow Proxies. Let&apos;s get you started with
                    your tracking.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CustomList>
                    <CustomListItem index={1}>
                        <Button onClick={() => router.push("/pull/import")}>
                            <Import className="w-5 h-5" />
                            Import Pull History
                        </Button>
                    </CustomListItem>
                    <CustomListItem index={2}>
                        <Button>
                            <Eye className="w-5 h-5" />
                            View Your Pulls
                        </Button>
                    </CustomListItem>
                    <CustomListItem index={3} last={true}>
                        <Button>
                            <RefreshCcw className="w-5 h-5" />
                            Sync Your Data
                        </Button>
                    </CustomListItem>
                </CustomList>
            </CardContent>
            <CardFooter>
                <p className="text-sm font-bold text-primary">Keep your data safe with Cloud Sync.</p>
            </CardFooter>
        </Card>
    );
}
