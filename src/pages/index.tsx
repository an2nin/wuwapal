import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function Home() {
    return (
        <div
            className={`flex flex-col items-center justify-center w-full h-[80vh] `}
        >
            <Card className="w-96">
                <CardHeader>
                    <CardTitle>Welcome to WuWaPal </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        The only pal you need for your adventures in Wuthering
                        Waves. WuWaPal will help you with everything you need to
                        plan your next adventure{" "}
                        <span className="text-xs">in future</span>. and now head
                        on to the Convene Tracker which the only thing currently
                        works.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button>Convene Tracker</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
