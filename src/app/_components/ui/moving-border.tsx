interface Props {
    children: React.ReactNode;
    isHoverable?: boolean;
}
export default function MovingBorder({ children, isHoverable }: Props) {
    return (
        <button className="relative inline-flex h-12 overflow-hidden rounded-2xl p-[2px]">
            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FF0565_0%,#F1F1F1_50%,#FF0565_100%)]" />
            <span
                className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-background px-2 py-3 text-sm font-medium text-white backdrop-blur-3xl ${
                    isHoverable ? "hover:bg-primary" : ""
                }`}
            >
                {children}
            </span>
        </button>
    );
}
