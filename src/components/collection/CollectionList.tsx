interface Props {
    type: string;
}
export default function CollectionList({ type }: Props) {
  return (
    <div>{type}</div>
  )
}
