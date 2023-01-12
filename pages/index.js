import Head from 'next/head'
import {useEffect, useState} from 'react'
import cn from 'classnames'
import formatDate from 'date-fns/format'
import useSWR, {mutate, SWRConfig} from 'swr'
import 'tailwindcss/tailwind.css'
import {listGuestbookEntries} from '@/lib/fauna'
import SuccessMessage from '@/components/SuccessMessage'
import ErrorMessage from '@/components/ErrorMessage'
import LoadingSpinner from '@/components/LoadingSpinner'

const fetcher = (url) => fetch(url).then((res) => res.json())

const putEntry = (payload) =>
    fetch('/api/entries', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => (res.ok ? res.json() : Promise.reject(res)))

const useEntriesFlow = ({fallback}) => {
    const {data: entries} = useSWR('/api/entries', fetcher, {
        fallbackData: fallback.entries,
    })
    const onSubmit = async (payload) => {
        await putEntry(payload)
        await mutate('/api/entries')
    }

    return {
        entries,
        onSubmit,
    }
}

const AppHead = () => (
    <Head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.png"/>
        <link
            href="https://fonts.googleapis.com/css2?family=Great+Vibes"
            rel="stylesheet"
        />
        <link
            href="https://fonts.googleapis.com/css2?family=Libre+Baskerville"
            rel="stylesheet"
        />
        <link
            href="https://fonts.googleapis.com/css2?family=Khula"
            rel="stylesheet"
        /><link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display"
            rel="stylesheet"
        />

    </Head>
)

const EntryForm = ({onSubmit: onSubmitProp}) => {
    const initial = {
        name: '',
        message: '',
    }
    const [values, setValues] = useState(initial)
    const [formState, setFormState] = useState('initial')
    const isSubmitting = formState === 'submitting'

    const onSubmit = (ev) => {
        ev.preventDefault()

        setFormState('submitting')
        onSubmitProp(values)
            .then(() => {
                setValues(initial)
                setFormState('submitted')
            })
            .catch(() => {
                setFormState('failed')
            })
    }

    const makeOnChange =
        (fieldName) =>
            ({target: {value}}) =>
                setValues({
                    ...values,
                    [fieldName]: value,
                })

    const inputClasses = cn(
        'block py-2 bg-white dark:bg-gray-800',
        'rounded-md border-gray-300 focus:ring-blue-500',
        'focus:border-blue-500 text-gray-900 dark:text-gray-100'
    )

    return (
        <>
            <form className="flex relative my-4" onSubmit={onSubmit}>
                <input
                    required
                    className={cn(inputClasses, 'w-1/3 mr-2 px-4')}
                    aria-label="Your name"
                    placeholder="Your name..."
                    value={values.name}
                    onChange={makeOnChange('name')}
                />
                <input
                    required
                    className={cn(inputClasses, 'pl-4 pr-32 flex-grow')}
                    aria-label="Your message"
                    placeholder="Your message..."
                    value={values.message}
                    onChange={makeOnChange('message')}
                />
                <button
                    className={cn(
                        'flex items-center justify-center',
                        'absolute right-1 top-1 px-4 font-bold h-8',
                        'bg-gray-100 dark:bg-gray-700 text-gray-900',
                        'dark:text-gray-100 rounded w-28'
                    )}
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <LoadingSpinner/> : 'Sign'}
                </button>
            </form>
            {{
                failed: () => <ErrorMessage>Something went wrong. :(</ErrorMessage>,

                submitted: () => (
                    <SuccessMessage>Thanks for signing the guestbook.</SuccessMessage>
                ),
            }[formState]?.()}
        </>
    )
}

const Guestbook = ({fallback}) => {
    const {entries, onSubmit} = useEntriesFlow({fallback})
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [guest, setGuest] = useState("guest")

    useEffect(() => {
        setGuest(new URLSearchParams(window.location.search).get('guest'))

        const target = new Date("04/15/2023 15:00:00");

        const interval = setInterval(() => {
            const now = new Date();
            const difference = target.getTime() - now.getTime();
            setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
            setHours(Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            ));
            setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return (
        <SWRConfig value={{fallback}}>
            <AppHead/>
            <header className="sticky top-0 border-b-[0.70rem] border-white">
                <div className="border-b-2 flex mx-[1rem] pt-[1rem] pb-[0.2rem] bg-white items-center justify-center flex-col	">
                    {/*<button*/}
                    {/*    className="border rounded-md pt-[0.25rem] px-[0.75rem] font-bold self-end bg-green-600 hover:bg-green-900 text-white text-sm">RSVP*/}
                    {/*</button>*/}
                    <h1 className="text-4xl font-highlight">Ursula & Luis</h1>
                    <p className="bg-white relative top-[13px] rounded-md text-xs px-[1rem] hover:text-green-700">Nuestra Boda</p>
                </div>
            </header>
            <main className="max-w-4xl mx-auto p-4 m-0 font-sans text-sm">
                <section className="py-[2rem] text-center grid justify-center">
                    <div
                        className="mb-0 max-h-[30vh] max-w-full overflow-hidden container flex items-center justify-center h-screen m-auto bg-fixed bg-center bg-cover custom-img">
                        <img className="my-[2rem] max-w-full" src="/static/ursuyluis.jpg"/>
                    </div>
                    <p className="mt-[0.50rem] mb-[1.5rem] text-gray-600 text-sm">{`faltan ${days} dias ${hours} horas ${minutes} minutos`}</p>

                    <p>Lo tenemos todo. El traje, el lugar, las flores, el mezcal...</p>
                    <p>Pero nos falta lo básico: ¡Contar contigo en este día tan importante para nosotros!</p>
                    <p>Asi que por favor confirma lo que ya sabemos: ¡Que vienes seguro!</p>
                    <p className="pt-[3rem]">La ceremonia tendrá lugar el</p>
                    <h2 className="text-lg font-bold">Sabado 15 de Abril 2023 </h2>
                        <h2 className="text-lg font-bold">en Oaxaca, Mexico</h2>
                </section>
                <hr className="mx-auto my-[1rem] w-28 transition transition-[width] ease-linear duration-1000	"/>
                <section className="py-[2rem] text-center flex flex-wrap justify-center gap-[3rem]" id="eventos">
                    <div className="text-gray-600 m-[0.2rem]">
                        <h3 className="font-black text-black text-lg">BODA RELIGIOSA</h3>
                        <p>TEMPLO SAN MATÍAS JALATLACO</p>
                        <p>5:00PM – 6:00PM</p>
                        <a href="https://goo.gl/maps/hp35YxexwTVbkx859" className="hover:text-black text-xs">
                            <p>Miguel Hidalgo 211, </p>
                            <p>Barrio de Jalatlaco</p>
                            <p>68080 Oaxaca de Juárez, Oax., Mexico</p>
                        </a>
                    </div>
                    <div className="text-gray-600 m-[0.2rem]">
                        <h3 className="font-black text-black text-lg">BODA CIVIL Y FIESTA</h3>
                        <p>SALON DIONYSUS</p>
                        <p>7:00PM – 1:00AM</p>
                        <a href="https://goo.gl/maps/hp35YxexwTVbkx859" className="hover:text-black  text-xs">
                            <p>Av 16 de Septiembre Núm 22, </p>
                            <p>Agencia Municipal Sta Maria Ixcotel</p>
                            <p> 71229 Santa Lucía del Camino, Oax., Mexico</p>
                        </a>
                    </div>
                </section>
                <hr className="mx-auto my-[1rem] w-28 transition transition-[width] ease-linear duration-1000	"/>
                <section className="py-[2rem] text-center" id="regalos">
                    <h3 className="font-black text-black text-lg">MESA DE REGALOS</h3>
                    <p>El mejor regalo que nos puedes dar es tu presencia,</p>
                    <p className="pb-[1rem]">pero si quieres obsequiarnos algo puedes hacerlo de dos formas:</p>
                    <a className="text-base p-[1rem] hover:text-green-700" href="https://www.amazon.com.mx/wedding/share/ushu_y_luis">Amazon </a>
                    <a className="text-base p-[1rem] hover:text-green-700" href="https://mesaderegalos.liverpool.com.mx/milistaderegalos/50945324">Liverpool </a>
                </section>
                <hr className="mx-auto my-[1rem] w-28 transition transition-[width] ease-linear duration-1000	"/>
                <section className="py-[2rem] text-center" id="rsvp">

                <h5 className={cn('text-lg md:text-xl font-bold', 'text-gray-900')}>
                        RSVP
                    </h5>
                    <p className="my-1 text-gray-800">
                        Por favor confirma tu asistencia antes del 20 de marzo del 2023, esperamos poder celebrar contigo!
                    </p>
                    <p>Telefono/Whatsapp: 951 649 799</p>
                    {/*<EntryForm onSubmit={onSubmit}/>*/}
                </section>
            </main>
            <footer
                className="text-xs border-t-2 flex sticky bottom-0 mx-[1rem] py-[1rem] bg-white items-center justify-center flex-col"> Ursula
                & Luis | Abril 2023
            </footer>
        </SWRConfig>
    )
}

export async function getStaticProps() {
    const entries = await listGuestbookEntries()
    return {
        props: {
            fallback: {
                entries,
            },
        },
    }
}

export default Guestbook
