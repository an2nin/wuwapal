"use client";
import CloudSync from "./_components/CloudSync";
import LocalStorage from "./_components/LocalStorage";

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
