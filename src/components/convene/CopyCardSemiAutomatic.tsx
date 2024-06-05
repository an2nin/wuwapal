import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import createImportScript, { isGamePathValid } from "@/helpers/processors";
import { useToast } from "@/components/ui/use-toast";

interface Props {
    text: string;
}

export default function CopyCardSemiAutomatic({ text }: Props) {
    const [processedText, setProcessedText] = useState<string | null>(null);

    const { toast } = useToast();
    const handleCopy = () => {
        if(processedText) {
            navigator.clipboard
            .writeText(processedText)
            .then(() => {
                toast({
                    title: "Text Copied to Clipboard",
                    description: "Now Paste it in Windows PowerShell",
                });
            })
            .catch((err) => {
                console.error("Error copying text: ", err);
            });
        }
    };

    useEffect(() => {
        if (isGamePathValid(text) && text != "") {
            const ps = createImportScript(text);
            setProcessedText(ps);
        }else{
            setProcessedText(null);
        }
    }, [text]);

    return (
        <Card>
            <CardContent className="p-5">
                <div className="flex  items-center gap-5">
                    <div>
                        <Button className="font-bol" size="icon" onClick={handleCopy} disabled={!processedText}>
                            <Copy />
                        </Button>
                    </div>
                    <div>{processedText || "Please enter a valid path to get the script."}</div>
                </div>
            </CardContent>
        </Card>
    );
}
