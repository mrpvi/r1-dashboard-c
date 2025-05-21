'use client';

import { useSidebarStore } from '@/stores/sidbar.store';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SignOutButton from './SignOutButton';

const sidebarItems = [
    {
        label: 'All Articles',
        href: '/dashboard/articles',
    },
    {
        label: 'New Article',
        href: '/dashboard/articles/create',
    },
]

export const Sidebar = () => {
    const { sidebarVisible } = useSidebarStore();
    const pathname = usePathname();

    const isActive = (path: string) => {
        const isPaginatedPath = /\/\d+$/.test(pathname);
        const basePath = pathname.replace(/\/\d+$/, '');
        return path === basePath || (isPaginatedPath && path === basePath);
    };

    const linkClasses = (path: string) => {
        return classNames(
            'flex items-center p-4 text-body-1 !text-neutral-fg1-default text-nowrap',
            { 'bg-primary-bg1-default !text-primary-fg1-default': isActive(path) }
        );
    }

    const sidebarClasses = classNames(
        'w-60 min-h-full bg-neutral-bg1-default border-r border-gray-200 p-4 transition-all duration-300 fixed top-0 z-50 lg:relative flex flex-col justify-between',
        { '-ms-96 lg:ms-0': !sidebarVisible }
    );
    return (
        <aside className={sidebarClasses}>
            <nav className="space-y-2">
                <div className="space-y-2">
                    <span className="text-neutral-fg1-default text-body-1 px-3 py-2 bg-neutral-bg2-default rounded-sm lg:hidden mb-4 block">
                        Arvancloud Challenge
                    </span>
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={linkClasses(item.href)}
                        >
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </nav>
            <SignOutButton
                className="w-full lg:hidden"
            />
        </aside>
    );
};
