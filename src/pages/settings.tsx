import CloudSync from "@/components/setting/CloudSync";
import LocalStorage from "@/components/setting/LocalStorage";

export default function Settings() {
    return (
        <div className="flex flex-col gap-5 md:px-20">
            <div className="text-4xl font-bold">
                <h1>Settings</h1>
            </div>
            <LocalStorage />
            <CloudSync />
        </div>
    );
}
