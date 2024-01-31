import {ReactNode} from "react";

export default function GuestsLayout(
    {children}: { children: ReactNode }) {
    return (
        <section>
                {children}
        </section>
    )
}