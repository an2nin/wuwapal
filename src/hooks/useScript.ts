import { useState, useEffect } from "react";

const useScript = (src: string) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.defer = true;

        const onScriptLoad = () => {
            setIsLoaded(true);
        };

        const onScriptError = () => {
            setIsLoaded(false);
        };

        script.addEventListener("load", onScriptLoad);
        script.addEventListener("error", onScriptError);

        document.body.appendChild(script);

        return () => {
            script.removeEventListener("load", onScriptLoad);
            script.removeEventListener("error", onScriptError);
            document.body.removeChild(script);
        };
    }, [src]);

    return isLoaded;
};

export default useScript;
