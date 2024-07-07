import { Card, CardContent } from "@/app/_components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/_components/ui/table";
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
                    <div className="flex items-center gap-1 text-quality-5 text-xl">
                        5 ✦ List
                    </div>
                ) : (
                    <div className="flex items-center gap-1 text-quality-4 text-xl">
                        4 ✦ List
                    </div>
                )}

                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-white">
                            <TableHead className="w-[50%]">Name</TableHead>
                            <TableHead className="w-[25%]">Total</TableHead>
                            <TableHead className="w-[25%]">
                                <Percent />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.entries(items).map(([key, value]: any) => (
                            <React.Fragment key={key}>
                                <TableRow>
                                    <TableCell>
                                        <div className="flex items-center gap-3 capitalize">
                                            <img
                                                className="size-10"
                                                src={`${
                                                    process.env
                                                        .NEXT_PUBLIC_IMAGE_URL
                                                }/combined/${key
                                                    .toLowerCase()
                                                    .replace(/:/g, "")
                                                    .replace(/ /g, "_")}.webp`}
                                                alt={key}
                                            />
                                            {key}
                                        </div>
                                    </TableCell>
                                    <TableCell>{value.c}</TableCell>
                                    <TableCell>{value.p}</TableCell>
                                </TableRow>
                                <tr>
                                    <td colSpan={4}>
                                        <span
                                            className={` h-[2px] block ${
                                                star == 5
                                                    ? "bg-quality-5"
                                                    : "bg-quality-4"
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
