"use client";
import PageHeader from "@/shared/components/layout/PageHeader";
import BackupManager from "./_components/BackupManager";
import CloudSync from "./_components/CloudSync/Index";
import Profile from "./_components/Profile";

export default function Settings() {
    return (
        <div className="flex flex-col gap-5 ">
            <PageHeader title="Settings" />
            <Profile />
            <CloudSync />
            <BackupManager />
        </div>
    );
}
