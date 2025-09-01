export default function InputValidationError({
    children,
}: {
    children: React.ReactNode;
}) {
    return <p className="text-red-500 text-sm absolute">{children}</p>;
}
