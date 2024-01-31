import {constants} from '../public/static/constants';
import Counter from '@/components/counter'
import RsvpForm from "@/components/RsvpForm";


export default async function Home() {
    const {
        date,
        married,
        bride,
        groom,
        place,
        image,
        introParagraphs,
        events,
        giftRegistry
    } = constants;
    return (
        <main className='main'>
            <section className='section'>
                <div className='imageContainer'>
                    <img className='image' src={`/static/${image.src}`} alt={`${bride} & ${groom}`}/>
                </div>
                <p className='imageFooter'>{image.credits}</p>
                {!married
                    ? < Counter target={date}/>
                    : <p className='imageFooter'>{image.footer}</p>}
                {introParagraphs.map((i, index) => <p key={index}>{i}</p>)}
                <p className="first-text">La ceremonia tendrá lugar el</p>
                <h2>Sábado XX de XXXX 202? </h2>
                <h2>{`en ${place}`}</h2>
            </section>
            <hr className='separator'/>
            <section className='events' id="events">
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
            <hr className='separator'/>
            <section className="py-[2rem] text-center" id="regalos">
                <h3 className="font-black text-black text-lg">MESA DE REGALOS</h3>
                {giftRegistry.intro.map((introLine, i) => {
                    return <p key={i} className={i !== 0 ? "pb-[1rem]" : ''}>{introLine}</p>
                })}
                {giftRegistry.registries.map((registry, i) => {
                    return <a className="p-[1rem]" key={i} href={registry.link}>
                        <button className='button'>{registry.name}</button>
                    </a>
                })}
            </section>
            {/*<RsvpForm invite={invite}/>*/}
        </main>
    )
}
