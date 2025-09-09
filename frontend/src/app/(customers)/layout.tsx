import Header from "@/components/header";
import RootContextProvider from "@/components/contextProviders/rootContextProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}
