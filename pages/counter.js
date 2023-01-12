import {useEffect, useState} from 'react'
import {formatDuration, intervalToDuration} from 'date-fns'
import 'tailwindcss/tailwind.css'

const Counter = () => {
    const [timeLeft, setTimeLeft] = useState("faltan...");
    const counterClasses = "mt-[0.50rem] mb-[1.5rem] text-gray-600 text-sm";
    useEffect(() => {
        const target = new Date("04/15/2023 15:00:00 UTC-06:00");
        const formatDistanceLocale = {
            xSeconds: '{{count}} Segundos',
            xMinutes: '{{count}} Minutos',
            xHours: '{{count}} Horas',
            xDays: '{{count}} Dias',
            xMonths: '{{count}} Meses'
        }
        const shortEnLocale = {formatDistance: (token, count) => formatDistanceLocale[token].replace('{{count}}', count)}

        const interval = setInterval(() => {
            const now = new Date();
            let duration = intervalToDuration({
                start: now,
                end: target,
            })

            const counter = (formatDuration(duration, {
                delimiter: ', ', locale: shortEnLocale
            }))

            setTimeLeft(counter);
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return <p className={counterClasses}>{timeLeft}</p>

}

export default Counter
