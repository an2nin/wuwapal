import { Button } from "@/components/ui/button";
import { useBannerStore } from "@/stores/banner";
import { Download } from "lucide-react";
import JSZip from "jszip";
import { Parser } from "@json2csv/plainjs";
import { bannerTypes } from "@/helpers/constants";

export default function BackupCSV() {
    const bannerStore = useBannerStore<any>((state: any) => state);

    const handleDownload = async () => {
        const fields = [
            {
                label: "Roll",
                value: "r",
            },
            {
                label: "Name",
                value: "n",
            },
            {
                label: "Quality",
                value: "q",
            },
            {
                label: "Pity",
                value: "p",
            },
            {
                label: "Time",
                value: "t",
            },
        ];

        const zip = new JSZip();
        const json2csvParser = new Parser({ fields: fields });

        const csvs: any = [];

        bannerTypes.forEach((type) => {
            if (bannerStore.banners[type.store_id]) {
                csvs.push({
                    store_id: type.store_id,
                    data: json2csvParser.parse(
                        bannerStore.banners[type.store_id].items
                    ),
                });
            }
        });

        csvs.forEach((csv: any, idx: number) => {
            zip.file(`${csv.store_id}.csv`, csv.data);
        });

        // Generate zip and trigger download
        const content = await zip.generateAsync({ type: "blob" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = `backup-convene-record-wuwapal.com-${new Date().getTime()}.zip`;
        link.click();
    };

    return (
        <Button variant="ghostOutline" onClick={handleDownload}>
            <div className="flex items-center gap-2">
                <Download />
                Backup Banners (CSVs)
            </div>
        </Button>
    );
}
