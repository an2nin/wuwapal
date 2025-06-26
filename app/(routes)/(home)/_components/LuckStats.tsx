import SiteName from "@/shared/components/layout/SiteName";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

export default function LuckStats() {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <div className="">Luck Stats</div>
                    <SiteName />
                </CardTitle>
            </CardHeader>
            <CardContent></CardContent>
        </Card>
    );
}
