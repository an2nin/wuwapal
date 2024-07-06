interface Props {
    title?: string;
    children?: React.ReactNode;
}

export default function PageHeader({ title, children }: Props) {
    return (
        <>
            {title ? (
                <h1
                    className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl"
                    style={{
                        background: "linear-gradient(to right, hsl(var(--accent)), #fff)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        color: "transparent",
                    }}
                >
                    {title}
                </h1>
            ) : (
                children
            )}
        </>
    );
}
