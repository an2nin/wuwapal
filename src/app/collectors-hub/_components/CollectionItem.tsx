import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import { Badge } from "@/app/_components/ui/badge";
import { WEAPON_TYPES } from "@/shared/weapons";
import { ELEMENTS } from "@/shared/resonators";

interface Props {
    type: string;
    name: string;
    resource: any;
    count: number;
    clickHandler?: () => void;
}
export default function CollectionItem({
    type,
    resource,
    name,
    count,
    clickHandler,
}: Props) {
    return (
        <Card
            className={`w-28 h-48 p-0 m-0 flex flex-col justify-between overflow-hidden group cursor-pointer hover:border ${
                resource.quality == 4
                    ? "bg-star4-collection"
                    : "bg-star5-collection"
            } ${!count || count == 0 ? "grayscale" : ""}`}
            onClick={clickHandler}
        >
            <CardContent className="overflow-hidden relative h-full p-2">
                {count && (
                    <Badge
                        className={`absolute top-0 right-0 z-30 shadow-2xl shadow-white font-bold rounded-tr-xl rounded-bl-xl rounded-tl-none rounded-br-none py-1 px-2 bg-background text-white border`}
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
                {type == "resonator" ? (
                    <div className="flex justify-between absolute bottom-0 left-0 w-full z-40 p-1">
                        <div>
                            <img
                                className="w-8 h-8"
                                src={WEAPON_TYPES[resource.weapon]?.image}
                                alt={name}
                            />
                        </div>
                        <div>
                            <img
                                className="w-8 h-8"
                                src={ELEMENTS[resource.element]?.image}
                                alt={name}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-end absolute bottom-0 left-0 w-full z-40 p-1">
                        <div>
                            <img
                                className="w-8 h-8"
                                src={WEAPON_TYPES[resource.type]?.image}
                                alt={name}
                            />
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter className="m-0 p-0 z-20">
                <div className="w-full text-xs bg-card-light rounded-b-lg text-center py-2 font-bold">
                    {name}
                </div>
            </CardFooter>
        </Card>
    );
}
