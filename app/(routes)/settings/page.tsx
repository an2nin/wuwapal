"use client";
import PageHeader from "@/core/layout/page-header";
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
