import { persistor } from "@/redux/store";
import React from "react";

persistor.pause();
persistor.flush().then(() => {
    return persistor.purge();
});

export default function reset() {
    return <div>reset</div>;
}
