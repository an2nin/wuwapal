interface Props {
    title?: string;
    children?: React.ReactNode;
}

export default function PageHeader({ title, children }: Props) {
    return (
        <>
            {title ? (
                <h1
                    className="pb-2 scroll-m-20 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight w-fit"
                    style={{
                        background: "linear-gradient(to right, hsl(var(--primary)), #fff)",
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
