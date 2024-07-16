import CustomListItem from "@/app/_components/layout/CustomListItem";
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
