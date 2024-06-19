import { eventProcessed, events } from "@/helpers/events";
import { useEffect, useState } from "react";
import EventCard from "@/components/events/EventCard";

export default function EventTracker() {
    const [processedEvents, setProcessedEvents] = useState<any>(null);

    useEffect(() => {
        const p_events = eventProcessed();
        setProcessedEvents(p_events);
    }, []);

    return (
        <>
            {processedEvents && (
                <div className="flex flex-col gap-3">
                    <div>
                        <h2 className="text-xl font-bold pb-3">
                            CURRENT EVENTS
                        </h2>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                            {processedEvents.runningEvents.map((event: any) => (
                                <EventCard
                                    event={event}
                                    key={event.title}
                                    type="ce"
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold pb-3">
                            UPCOMING EVENTS
                        </h2>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                            {processedEvents.upcomingEvents.map(
                                (event: any) => (
                                    <EventCard
                                        event={event}
                                        key={event.title}
                                        type="ue"
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
