import cn from 'classnames'
import useSWR, {mutate, SWRConfig} from 'swr'
import 'tailwindcss/tailwind.css'
import {getTodo} from '@/lib/fauna'
import AppHead from './head'
import Counter from './counter'
import EntryForm from './guestForm'

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

    return {
        todo,
        onSubmit,
    }
}

const Guestbook = ({fallback, code}) => {
    const {todo, onSubmit} = useTodoFlow({fallback, code});

    return (
        <SWRConfig value={{fallback}}>
            <AppHead/>
            <header className="sticky top-0 border-b-[0.70rem] border-white">
                <div>{todo && todo.text}</div>
                <div
                    className="border-b-2 flex mx-[1rem] pt-[1rem] pb-[0.2rem] bg-white items-center justify-center flex-col	">
                    {/*<button*/}
                    {/*    className="border rounded-md pt-[0.25rem] px-[0.75rem] font-bold self-end bg-green-600 hover:bg-green-900 text-white text-sm">RSVP*/}
                    {/*</button>*/}
                    <h1 className="text-4xl font-highlight">Ursula & Luis</h1>
                    <p className="bg-white relative top-[13px] rounded-md text-xs px-[1rem] hover:text-green-700">Nuestra
                        Boda</p>
                </div>
            </header>
            <main className="max-w-4xl mx-auto p-4 m-0 font-sans text-sm">
                <section className="py-[2rem] text-center grid justify-center">
                    <div
                        className="mb-0 max-h-[30vh] max-w-full overflow-hidden container flex items-center justify-center h-screen m-auto bg-fixed bg-center bg-cover custom-img">
                        <img className="my-[2rem] max-w-full" src="/static/ursuyluis.jpg" alt="Foto de los novios"/>
                    </div>
                    <Counter/>
                    <p>Lo tenemos todo. El traje, el lugar, las flores, el mezcal...</p>
                    <p>Pero nos falta lo básico: ¡Contar contigo en este día tan importante para nosotros!</p>
                    <p>Asi que por favor confirma lo que ya sabemos: ¡Que vienes seguro!</p>
                    <p className="pt-[3rem]">La ceremonia tendrá lugar el</p>
                    <h2 className="text-lg font-bold">Sábado 15 de abril 2023 </h2>
                    <h2 className="text-lg font-bold">en Oaxaca, México</h2>
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
                            <p>68080 Oaxaca de Juárez, Oax., México</p>
                        </a>
                    </div>
                    <div className="text-gray-600 m-[0.2rem]">
                        <h3 className="font-black text-black text-lg">BODA CIVIL Y FIESTA</h3>
                        <p>SALON DIONYSUS</p>
                        <p>7:00PM – 1:00AM</p>
                        <a href="https://goo.gl/maps/hp35YxexwTVbkx859" className="hover:text-black  text-xs">
                            <p>Av 16 de Septiembre Núm 22, </p>
                            <p>Agencia Municipal Sta Maria Ixcotel</p>
                            <p> 71229 Santa Lucía del Camino, Oax., México</p>
                        </a>
                    </div>
                </section>
                <hr className="mx-auto my-[1rem] w-28 transition transition-[width] ease-linear duration-1000	"/>
                <section className="py-[2rem] text-center" id="regalos">
                    <h3 className="font-black text-black text-lg">MESA DE REGALOS</h3>
                    <p>El mejor regalo que nos puedes dar es tu presencia,</p>
                    <p className="pb-[1rem]">pero si quieres obsequiarnos algo puedes hacerlo de dos formas:</p>
                    <a className="p-[1rem]" href="https://www.amazon.com.mx/wedding/share/ushu_y_luis">
                        <button
                            className=" rounded-md text-base p-[0.5rem]  self-end bg-gray-100 hover:bg-gray-400">Amazon
                        </button>
                    </a>
                    <a className="p-[1rem]"
                       href="https://mesaderegalos.liverpool.com.mx/milistaderegalos/50945324">
                        <button
                            className=" rounded-md text-base p-[0.5rem]  self-end bg-gray-100 hover:bg-gray-400">Liverpool
                        </button>
                         </a>
                </section>
                <hr className="mx-auto my-[1rem] w-28 transition transition-[width] ease-linear duration-1000	"/>
                <section className="py-[2rem] text-center" id="rsvp">

                    <h5 className={cn('text-lg md:text-xl font-bold', 'text-gray-900')}>
                        RSVP
                    </h5>
                    {(!todo || todo.rsvp !== true) ? <p className="my-1 text-gray-800">
                        Por favor confirma tu asistencia antes del 20 de marzo del 2023, esperamos poder celebrar
                        contigo!
                    </p> : <>
                        <h3 className="text-gray-600 pb-[1rem]">GRACIAS POR MANDAR TU RESPUESTA!</h3>
                        <p>{`Respondiste que ${todo.attending === true ? 'si' : 'no'} vas a ir.`}</p>
                        <p>Si quieres modificar tu asistencia, por favor mandanos un mensaje al número de WhatsApp</p>
                    </>
                    }
                    {(todo && todo.rsvp !== true) && <EntryForm onSubmit={onSubmit} todo={todo}/>}
                    <p className="text-gray-600 pb-[1rem]">TELÉFONO/WHATSAPP: 951 649 799</p>
                </section>
            </main>
            <footer
                className="text-xs border-t-2 flex sticky bottom-0 mx-[1rem] py-[1rem] bg-white items-center justify-center flex-col"> Ursula
                & Luis | abril 2023
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
