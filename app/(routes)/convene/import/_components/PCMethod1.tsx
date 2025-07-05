import CustomListItem from "@/core/layout/custom-list-item";
import CopyCardAutomatic from "./CopyCardAutomatic";

export default function PCMethod1() {
    return (
        <>
            <CustomListItem
                title="Open Windows PowerShell and run the following command."
                index={3}
            >
                <CopyCardAutomatic />
            </CustomListItem>
        </>
    );
}
