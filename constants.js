// CONSTANTS
import {isAfter} from "date-fns";

const date = new Date("04/15/2023 15:00:00 UTC-06:00");
//
const now = new Date(); // Do not change
const married = isAfter(date, now); // Do not change
//
const bride = 'Ursula';
const groom = 'Luis';
const header = 'Nuestra Boda';
const place = 'Oaxaca, México';
const contactNumber = '951 649 799';
const replyBefore = new Date("03/20/2023 15:00:00 UTC-06:00");
const introParagraphs = married
    ? ['Lo tenemos todo. El traje, el lugar, las flores, el mezcal...', 'Pero nos falta lo básico: ¡Contar contigo en este día tan importante para nosotros!', 'Asi que por favor confirma lo que ya sabemos: ¡Que vienes seguro!']
    : ['Lo tenemos todo. El traje, el lugar, las flores, el mezcal...', 'Pero nos falta lo básico: ¡Contar contigo en este día tan importante para nosotros!', 'Asi que por favor confirma lo que ya sabemos: ¡Que vienes seguro!'];
const events = [
    {
        eventName: 'BODA RELIGIOSA',
        place: 'TEMPLO SAN MATÍAS JALATLACO',
        time: '5:00PM – 6:00PM',
        address: {
            link: 'https://goo.gl/maps/hp35YxexwTVbkx859',
            addessLines: [
                'Miguel Hidalgo 211,',
                'Barrio de Jalatlaco',
                '68080 Oaxaca de Juárez, Oax., México'
            ]
        }
    },
    {
        eventName: 'BODA CIVIL Y FIESTA',
        place: 'SALON DIONYSUS',
        time: '7:00PM – 1:00AM',
        address: {
            link: 'https://goo.gl/maps/hp35YxexwTVbkx859',
            addessLines: [
                'Av 16 de Septiembre Núm 22,',
                'Agencia Municipal Sta Maria Ixcotel',
                '71229 Santa Lucía del Camino, Oax., México'
            ]
        }
    }
];

const giftRegistry = {
    intro: ['El mejor regalo que nos puedes dar es tu presencia,', 'pero si quieres obsequiarnos algo puedes hacerlo de dos formas:'],
    registries: [
        {
            name: 'Amazon',
            link: 'https://www.amazon.com.mx/wedding/share/ushu_y_luis'
        },
        {
            name: 'Liverpool',
            link: 'https://mesaderegalos.liverpool.com.mx/milistaderegalos/50945324'
        }
    ]
};

export const constants = {
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
}

// Styles
export const styles = {
    header: "sticky top-0 border-b-[0.70rem] border-white",
    headerLine: 'border-b-2 flex mx-[1rem] pt-[1rem] pb-[0.2rem] bg-white items-center justify-center flex-col',
    headerNames: 'text-4xl font-highlight',
    headerEvent: 'bg-white relative top-[13px] rounded-md text-xs px-[1rem] hover:text-green-700',
    main: 'max-w-4xl mx-auto p-4 m-0 font-sans text-sm',
    section: 'py-[2rem] text-center grid justify-center',
    events: "py-[2rem] text-center flex flex-wrap justify-center gap-[3rem]",
    button: " rounded-md text-base p-[0.5rem]  self-end bg-gray-100 hover:bg-gray-400",
    imageContainer: 'mb-0 max-h-[30vh] max-w-full overflow-hidden container flex items-center justify-center h-screen m-auto bg-fixed bg-center bg-cover custom-img',
    image: 'my-[2rem] max-w-full',
    imageFooter: 'mt-[0.50rem] mb-[1.5rem] text-gray-600 text-sm',
    footer: "text-xs border-t-2 flex sticky bottom-0 mx-[1rem] py-[1rem] bg-white items-center justify-center flex-col capitalize",
    separator: "mx-auto my-[1rem] w-28 transition transition-[width] ease-linear duration-1000"
}