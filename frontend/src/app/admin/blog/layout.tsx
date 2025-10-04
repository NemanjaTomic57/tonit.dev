'use client';

import Button from '@/components/ui/button';
import { routes } from '@/routes';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="container py-8">
            <div className="grid grid-cols-[200px_1fr] gap-4">
                <div className="flex flex-col gap-2">
                    <Button href={routes.createBlogPost} className="btn-fill-primary btn-lg">
                        Create Post
                    </Button>
                    <Button href={routes.updateBlogPost} className="btn-fill-primary btn-lg">
                        Update Post
                    </Button>
                    <Button href={routes.home} className="btn-fill-primary btn-lg">
                        Home
                    </Button>
                </div>
                {children}
            </div>
        </div>
    );
}
