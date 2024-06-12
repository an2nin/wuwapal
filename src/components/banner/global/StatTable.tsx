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
import { Percent, Star } from "lucide-react";
import React from "react";

interface Props {
    items: any;
    total: number;
    star: number;
}
export default function StatTable({ items, total, star }: Props) {
    return (
        <Card>
            <CardContent className="p-5">
                {star == 5 ? (
                    <div className="flex items-center gap-1 text-yellow-400 text-xl">
                        5 <Star className="w-4 h-4 fill-yellow-400" /> List
                    </div>
                ) : (
                    <div className="flex items-center gap-1 text-purple-400 text-xl">
                        4 <Star className="w-4 h-4 fill-purple-400" /> List
                    </div>
                )}

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>
                                <Percent />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.entries(items).map(([key, value]: any) => (
                            <React.Fragment key={key}>
                                <TableRow>
                                    <TableCell>
                                        <img
                                            className="h-10 w-auto"
                                            src={`${
                                                process.env
                                                    .NEXT_PUBLIC_IMAGE_URL
                                            }/combined/${key
                                                .toLowerCase()
                                                .replace(/:/g, "")
                                                .replace(/ /g, "_")}.webp`}
                                            alt=""
                                        />
                                    </TableCell>
                                    <TableCell className="capitalize">
                                        {key}
                                    </TableCell>
                                    <TableCell>{value.c}</TableCell>
                                    <TableCell>{value.p}</TableCell>
                                </TableRow>
                                <tr>
                                    <td colSpan={4}>
                                        <span
                                            className={` h-[2px] block ${
                                                star == 5
                                                    ? "bg-yellow-400"
                                                    : "bg-purple-400"
                                            }`}
                                            style={{
                                                width: `${value.p}%`,
                                            }}
                                        ></span>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
