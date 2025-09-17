import Footer from '@/components/footer';
import Header from '@/components/header';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-dvh flex-col justify-between">
            <Header />
            {children}
            <Footer />
        </div>
    );
}
