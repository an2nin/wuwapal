const event_url = process.env.NEXT_PUBLIC_IMAGE_URL + "/events/";
export const events: any = [
    {
        title: "Second Coming of Solaris",
        expires: "2024-06-26T20:00:00.000Z",
        starts: "2024-06-10T20:00:00.000Z",
        image_path: event_url + "second_coming_of_solaris.jpg",
    },
    {
        title: "Alloy Smelt",
        expires: "2024-06-26T20:00:00.000Z",
        starts: "2024-06-10T20:00:00.000Z",
        image_path: event_url + "alloy_smelt.jpg",
    },
    {
        title: "Wuthering Exploration",
        expires: "2024-06-26T20:00:00.000Z",
        starts: "2024-06-10T20:00:00.000Z",
        image_path: event_url + "wuthering_exploration.jpg",
    },
    {
        title: "Depths of Illusive Realm",
        expires: "2024-06-26T20:00:00.000Z",
        starts: "2024-06-10T20:00:00.000Z",
        image_path: event_url + "depths_of_illusive_realm.jpg",
    },
    {
        title: "WuWa Patch 1.1",
        expires: "2024-08-26T20:00:00.000Z",
        starts: "2024-06-28T20:00:00.000Z",
        image_path: event_url + "wuwa_patch_1_1.jpg",
    },
];

function calculateTimeLeft(endDate: any, startDate: any) {
    const totalMilliseconds = endDate - startDate;
    const totalHours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;

    return {days: days, hours: hours};
}

export const eventProcessed = () => {
    const now = new Date(new Date().toISOString());

    const runningEvents: any = [];
    const upcomingEvents: any = [];

    events.forEach((event: any) => {
        const starts = new Date(event.starts);
        const expires = new Date(event.expires);

        if (now >= starts && now <= expires) {
            event.timeLeft = calculateTimeLeft(expires, now);
            runningEvents.push(event);
        } else if (now < starts) {
            event.timeLeft = calculateTimeLeft(starts, now);
            upcomingEvents.push(event);
        }
    });

    runningEvents.sort((a: any, b: any) => new Date(a.expires).getTime() - new Date(b.expires).getTime());
    upcomingEvents.sort((a: any, b: any) => new Date(a.starts).getTime() - new Date(b.starts).getTime());

    return { runningEvents, upcomingEvents };
};
