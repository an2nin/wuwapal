import CustomListItem from "@/app/_components/layout/CustomListItem";
import CopyCardSemiAutomatic from "./CopyCardSemiAutomatic";
import { Input } from "@/app/_components/ui/input";

interface Props {
    gamePath: string;
    handleGamePathChange: (value: any) => void;
}

export default function PCMethod2({ gamePath, handleGamePathChange }: Props) {
    return (
        <>
            <CustomListItem title="Enter your installation directory" index={3}>
                <p className="text-sm text-muted-foreground mb-1">
                    Find the folder that contains
                    <span className="font-bold text-primary mx-1">
                        Wuthering Waves.exe
                    </span>
                    and
                    <span className="font-bold text-primary mx-1">Client</span>
                    folder.
                </p>
                <Input
                    placeholder="E.g. D:\Wuthering Waves\Wuthering Waves Game"
                    onChange={handleGamePathChange}
                    value={gamePath}
                />
            </CustomListItem>
            <CustomListItem
                title={"Open Windows PowerShell and run the following command."}
                index={4}
            >
                <CopyCardSemiAutomatic text={gamePath} />
            </CustomListItem>
        </>
    );
}
