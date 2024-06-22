import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
    type: string;
    name: string;
    resource: any;
    count: number;
}
export default function CollectionItem({ type, resource, name, count }: Props) {
    return (
        <Card
            className={`w-28 h-44  p-0 m-0 flex flex-col justify-between overflow-hidden group cursor-pointer hover:border ${
                resource.quality == 4
                    ? "bg-star4-collection"
                    : "bg-star5-collection"
            }`}
        >
            <CardContent className="overflow-hidden relative h-full p-2">
                {count && (
                    <Badge
                        className={`absolute top-0 right-0 z-30 shadow-2xl shadow-white text-black font-bold rounded-tr-3xl rounded-bl-3xl rounded-tl-none rounded-br-none py-1 px-3 ${
                            resource.quality == 4
                                ? "bg-purple-500"
                                : "bg-yellow-500"
                        }`}
                    >
                        {`${type == "weapon" ? "R" : "S"}${count - 1}`}
                    </Badge>
                )}
                <div className="h-full flex justify-center items-center pt-3">
                    <img
                        className="transform duration-500 scale-110 transition ease-in-out group-hover:scale-125 z-20"
                        src={resource.image}
                        alt={name}
                    />
                </div>
            </CardContent>
            <CardFooter className="m-0 p-0 z-20">
                <div className="w-full text-xs bg-background rounded-b-2xl text-center p-1 font-bold">
                    {name}
                </div>
            </CardFooter>
        </Card>
    );
}
