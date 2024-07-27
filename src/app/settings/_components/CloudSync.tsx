import { Button } from "@/app/_components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { Google } from "@/app/_components/ui/custom-icons";
import { useGoogleLogin } from "@react-oauth/google";

export default function CloudSync() {
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log(tokenResponse.access_token);
            // fetchToken({ code: tokenResponse.access_token });
        },
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/drive.appdata",
        ].join(" "),
    });
    return (
        <Card>
            <CardHeader>
                <CardTitle>Cloud Sync</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="max-w-2xl">
                    Easily save and access your data across all your devices
                    with your Google Account. Just log in, and click the
                    <span className="font-bold mx-1 text-accent">
                        Sync Data
                    </span>
                    button to import or export your information.
                </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-end">
                {false ? (
                    <Button
                        variant={"outline"}
                        className="hover:bg-transparent hover:scale-105"
                        onClick={() => login()}
                    >
                        <div className="flex gap-2 items-center">
                            <Google
                                className={`w-5 h-5 ${
                                    false ? "animate-spin" : ""
                                }`}
                            />
                            Sign in with Google
                        </div>
                    </Button>
                ) : (
                    <div className="text-red-500 font-bold">
                        Will be back very soon!!!
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}
