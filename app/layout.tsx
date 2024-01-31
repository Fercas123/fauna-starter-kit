import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import Link from "next/link";
import {format} from "date-fns";
import {constants} from '../public/static/constants';
import AppHead from '@/components/head'
import {ReactNode} from "react";

const {
    date,
    bride,
    groom,
    header,
    locale
} = constants;

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Wedding invitation',
    description: 'Please join us in our big day',
}

export default function RootLayout(
    {children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <AppHead/>
        <body className={inter.className}>
        <header>
            <div className="headerLine">
                <Link href='/'>
                    <h1 className="text-4xl font-highlight">
                        {`${bride} & ${groom}`}
                    </h1>
                </Link>
                <nav>
                    <ul>
                        <p>{header}</p>
                    </ul>
                </nav>
            </div>
        </header>
        {children}
        <footer>
            {`${bride} & ${groom} | ${format(date, 'MMMM yyyy', {locale: locale})}`}
        </footer>
        </body>
        </html>
    )
}
