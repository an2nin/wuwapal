import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";

const scriptUrl =
    "https://raw.githubusercontent.com/alpharmi/ww/main/getGacha.ps1";

const copyText =
    '[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12; Invoke-Expression (New-Object Net.WebClient).DownloadString("https://raw.githubusercontent.com/alpharmi/ww/main/getGacha.ps1")';

export default function PowerShellCopyCard() {
    const { toast } = useToast();
    const handleCopy = () => {
        navigator.clipboard
            .writeText(copyText)
            .then(() => {
                toast({
                    title: "Text Copied to Clipboard",
                    description: "Now Paste it in Windows PowerShell",
                });
            })
            .catch((err) => {
                console.error("Error copying text: ", err);
            });
    };
    return (
        <>
            <Card>
                <CardContent className="p-5">
                    <div className="flex items-center gap-5">
                        <div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleCopy}
                            >
                                <Copy size="30px" />
                            </Button>
                        </div>
                        <p className="break-all">{copyText}</p>
                    </div>
                </CardContent>
            </Card>
            <div className="flex justify-end gap-1 mr-3">
                You can review the script
                <a
                    target="_blank"
                    href={scriptUrl}
                    className="text-blue-500 underline"
                >
                    here
                </a>
            </div>
        </>
    );
}
