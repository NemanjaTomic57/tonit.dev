import RootContextProvider from '@/components/contextProviders/rootContextProvider';
import type { Metadata } from 'next';
import 'prismjs';
import 'prismjs/themes/prism.css'; // you can swap for prism-okaidia.css, prism-tomorrow.css, etc.
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
    title: 'Tonit - Nemanja Tomic',
    description: 'Web Development | DevOps Engineering | Cloud Architecture | IT Consultancy',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <RootContextProvider>
                    <div className="z-50">
                        <Toaster
                            toastOptions={{
                                success: {
                                    duration: 3000,
                                },
                                error: {
                                    duration: 4000,
                                },
                            }}
                        />
                    </div>
                    {children}
                </RootContextProvider>
            </body>
        </html>
    );
}
