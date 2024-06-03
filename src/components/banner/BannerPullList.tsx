import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
interface Props {
    banner: any;
}
export default function BannerPullList({ banner }: Props) {
    return (
        <Card>
            <CardContent className="h-full p-5">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Time</TableHead>
                            <TableHead>Pity</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Roll</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {banner.items.map((item: any, idx: number) => (
                            <TableRow key={idx} className={`${item.qualityLevel !=3 ? item.qualityLevel == 4 ? "bg-purple-500/40" : "bg-yellow-500/40" : ""}`}>
                                <TableCell>{item.time}</TableCell>
                                <TableCell>{item.pity}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell>{item.roll}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
