import CustomListItem from "@/components/convene/CustomListItem";
import CopyCardAutomatic from "@/components/convene/CopyCardAutomatic";

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
