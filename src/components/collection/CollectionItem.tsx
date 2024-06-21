import { Card, CardContent } from "@/components/ui/card";

interface Props {
  type: string;
  name: string;
  count: number;
}
export default function CollectionItem({ type, name, count }: Props) {
  return (
    <Card className="w-52">
      <CardContent className="p-5">
        <div className="w-full whitespace-nowrap overflow-auto text-xs pb-2">
          {name}
        </div>
        <div className="w-full whitespace-nowrap overflow-auto text-xs pb-2">
          {count}
        </div>
      </CardContent>
    </Card>
  )
}
