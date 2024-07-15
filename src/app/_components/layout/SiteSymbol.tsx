export default function SiteSymbol() {
    return (
        <div className="lowercase font-bold">
            {process.env.NEXT_PUBLIC_APP_NAME}
            <span className="text-primary">.com</span>
        </div>
    );
}
