import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BannerEmptyCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>No Convene Record</CardTitle>
            </CardHeader>
            <CardContent>
                <p>You have not pulled on this banner yet</p>
            </CardContent>
        </Card>
    );
}
