import { Button } from "@/app/_components/ui/button";
import { useBannerStore } from "@/stores/banner";
import { Download } from "lucide-react";
import JSZip from "jszip";
import { Parser } from "@json2csv/plainjs";
import { BANNERS } from "@/shared/banners";

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

        Object.keys(BANNERS).forEach((key) => {
            if (bannerStore.banners[BANNERS[key].store_id]) {
                csvs.push({
                    store_id: BANNERS[key].store_id,
                    data: json2csvParser.parse(
                        bannerStore.banners[BANNERS[key].store_id].items
                    ),
                });
            }
        });

        csvs.forEach((csv: any) => {
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
        <Button variant="outline" onClick={handleDownload}>
            <div className="flex items-center gap-2">
                <Download />
                Backup Banners (CSVs)
            </div>
        </Button>
    );
}
