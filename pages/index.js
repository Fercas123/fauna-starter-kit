import useSWR, {mutate, SWRConfig} from 'swr'
import 'tailwindcss/tailwind.css'
import {getTodo} from '@/lib/fauna'
import AppHead from '@/components/head'
import Counter from './counter'
import EntryForm from './guestForm'
import {format} from "date-fns";
import localeEs from 'date-fns/locale/es';
import {constants} from '../constants';

const {
    date,
    married,
    bride,
    groom,
    header,
    place,
    contactNumber,
    replyBefore,
    introParagraphs,
    events,
    giftRegistry
} = constants;

export const styles = {
    header: "sticky top-0 border-b-[0.70rem] border-white",
    headerLine: 'border-b-2 flex mx-[1rem] pt-[1rem] pb-[0.2rem] bg-white items-center justify-center flex-col',
    headerNames: 'text-4xl font-highlight',
    headerEvent: 'bg-white relative top-[13px] rounded-md text-xs px-[1rem] hover:text-green-700',
    main: 'max-w-4xl mx-auto p-4 m-0 font-sans text-sm',
    section: 'py-[2rem] text-center grid justify-center',
    events: "py-[2rem] text-center flex flex-wrap justify-center gap-[3rem]",
    button: " rounded-md text-base p-[0.5rem]  self-end bg-gray-100 hover:bg-gray-400",
    imageContainer: 'mb-0 max-h-[45vh] max-w-full overflow-hidden container flex items-center justify-center h-screen m-auto bg-fixed bg-center bg-cover custom-img',
    image: 'my-[2rem] max-w-full',
    imageFooter: 'mt-[0.50rem] mb-[1.5rem] text-gray-600 text-sm',
    footer: "text-xs border-t-2 flex sticky bottom-0 mx-[1rem] py-[1rem] bg-white items-center justify-center flex-col capitalize",
    separator: "mx-auto my-[1rem] w-28 transition transition-[width] ease-linear duration-1000"
}
const putTodo = (payload) =>
    fetch('/api/todos', {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => (res.ok ? res.json() : Promise.reject(res)))

const fetchWithCode = (code) => fetch('/api/todos', {
    body: JSON.stringify({code: code}),
}).then((r) => r.json());

const useTodoFlow = ({fallback, code}) => {
    const {data: todo} = useSWR(code, fetchWithCode, {fallbackData: fallback})
    const onSubmit = async (payload) => {
        await putTodo(payload)
        await mutate('/api/todos')
    }

    return {todo, onSubmit}
}

const Guestbook = ({fallback, code}) => {
    const {todo, onSubmit} = useTodoFlow({fallback, code});

    return (
        <SWRConfig value={{fallback}}>
            <AppHead/>
            <header className={styles.header}>
                <div>{todo && todo.text}</div>
                <div className={styles.headerLine}>
                    <h1 className={styles.headerNames}>{`${bride} & ${groom}`}</h1>
                    <p className={styles.headerEvent}>{header}</p>
                </div>
            </header>
            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.imageContainer}>
                        <img className={styles.image} src="/static/image.jpg" alt={`${bride} & ${groom}`}/>
                    </div>
                    <p className={styles.imageFooter}>Photo by <a href="https://unsplash.com/@kseegars?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Kadarius Seegars</a> on <a href="https://unsplash.com/photos/man-kissing-womans-forehead-dTOJSI_xE6w?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
                    </p>
                    {married
                        ? < Counter target={date}/>
                        : <p className={styles.imageFooter}>Gracias por acompañarnos!</p>}
                    {introParagraphs.map((i, index) => <p key={index}>{i}</p>)}
                    <p className="pt-[3rem]">La ceremonia tendrá lugar el</p>
                    <h2 className="text-lg font-bold">Sábado XX de XXXX 202? </h2>
                    <h2 className="text-lg font-bold">{`en ${place}`}</h2>
                </section>
                <hr className={styles.separator}/>
                <section className={styles.events} id="events">
                    {events.map((event, index) => {
                        const {eventName, place, time, address} = event;
                        return <div className="text-gray-600 m-[0.2rem]" key={index}>
                            <h3 className="font-black text-black text-lg">{eventName}</h3>
                            <p>{place}</p>
                            <p>{time}</p>
                            <a href={address.link} className="hover:text-black text-xs">
                                {address.addessLines.map((line, i) => <p key={i}>{line}</p>)}
                            </a>
                        </div>
                    })}
                </section>
                <hr className={styles.separator}/>
                <section className="py-[2rem] text-center" id="regalos">
                    <h3 className="font-black text-black text-lg">MESA DE REGALOS</h3>
                    {giftRegistry.intro.map((introLine, i) => {
                        return <p key={i} className={i !== 0 ? "pb-[1rem]" : ''}>{introLine}</p>
                    })}
                    {giftRegistry.registries.map((registry, i) => {
                        return <a className="p-[1rem]" key={i} href={registry.link}>
                            <button className={styles.button}>{registry.name}</button>
                        </a>
                    })}
                </section>
                <hr className={styles.separator}/>
                <section className="py-[2rem] text-center" id="rsvp">
                    <h5 className='text-lg md:text-xl font-bold text-gray-900'>
                        RSVP
                    </h5>
                    {(!todo || todo.rsvp !== true)
                        ? <p className="my-1 text-gray-800">
                            {`Por favor confirma tu asistencia antes del ${format(replyBefore, 'dd', {locale: localeEs})} de ${format(replyBefore, 'MMMM', {locale: localeEs})}, esperamos poder celebrar
                            contigo!`}
                        </p>
                        : <>
                            <h3 className="text-gray-600 pb-[1rem]">GRACIAS POR MANDAR TU RESPUESTA!</h3>
                            <p>{`Respondiste que ${todo.attending === true ? 'si' : 'no'} vas a ir.`}</p>
                            <p>Si quieres modificar tu asistencia, por favor mandanos un mensaje al número de
                                WhatsApp</p>
                        </>
                    }
                    {(todo && todo.rsvp !== true) && <EntryForm onSubmit={onSubmit} todo={todo}/>}
                    <p className="text-gray-600 pb-[1rem]">{`TELÉFONO / WHATSAPP: ${contactNumber}`}</p>
                </section>
            </main>
            <footer className={styles.footer}>
                {`${bride} & ${groom} | ${format(date, 'MMMM yyyy', {locale: localeEs})}`}
            </footer>
        </SWRConfig>
    )
}

Guestbook.getInitialProps = async (context) => {
    const {query: {code}} = context
    if (!code) return {};
    const res = await getTodo(code)
    return {fallback: res, code}
}

export default Guestbook
