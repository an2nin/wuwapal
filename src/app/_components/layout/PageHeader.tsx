interface Props {
    title?: string;
    children?: React.ReactNode;
}

export default function PageHeader({title, children}: Props) {
  return (
    <>
      {title ? <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">{title}</h1> : children}
    </>
  )
}
