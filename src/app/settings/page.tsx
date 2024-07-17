"use client";
import PageHeader from "../_components/layout/PageHeader";
import CloudSync from "./_components/CloudSync";
import LocalStorage from "./_components/LocalStorage";
import Profile from "./_components/Profile";

export default function Settings() {
    return (
        <div className="flex flex-col gap-5 md:px-20">
            <PageHeader title="Settings" />
            <Profile />
            <LocalStorage />
            <CloudSync />
        </div>
    );
}
