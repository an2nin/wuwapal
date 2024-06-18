import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
    event: any;
    type: string;
}

export default function EventCard({ event, type }: Props) {
    return (
        <Card >
            <CardContent className="p-1 relative">
                <div className="flex items-center">
                    <div className="flex gap-3 items-center">
                        {event.image_path && (
                            <img
                                src={event.image_path}
                                className="h-20 rounded-3xl"
                                alt={event.title}
                            />
                        )}
                        {event.title}
                    </div>

                    <div className="absolute top-1 right-2">
                    {type == "ue" ? (
                        <Badge>
                            <div className="flex gap-1 items-center">
                                <span>{event.timeLeft.days}d</span>
                                <span>{event.timeLeft.hours}h</span>
                            </div>
                        </Badge>
                    ) : (
                        <Badge
                            variant={`${
                                event.timeLeft.days > 2
                                    ? "success"
                                    : "destructive"
                            }`}
                        >
                            <div className="flex gap-1 items-center">
                                <span>{event.timeLeft.days}d</span>
                                <span>{event.timeLeft.hours}h</span>
                            </div>
                        </Badge>
                    )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
