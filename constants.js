// CONSTANTS
import {isAfter} from "date-fns";

const date = new Date("04/15/2023 15:00:00 UTC-06:00");
//
const now = new Date(); // Do not change
const married = isAfter(date, now); // Do not change
//
const bride = 'Novia';
const groom = 'Novio';
const header = 'Nuestra Boda';
const place = 'Estado, México';
const contactNumber = '951 XXX XXX';
const replyBefore = new Date("03/20/2023 15:00:00 UTC-06:00");
const introParagraphs = married
    ? ['Lo tenemos todo. El traje, el lugar, las flores, el mezcal...', 'Pero nos falta lo básico: ¡Contar contigo en este día tan importante para nosotros!', 'Asi que por favor confirma lo que ya sabemos: ¡Que vienes seguro!']
    : ['Lo tenemos todo. El traje, el lugar, las flores, el mezcal...', 'Pero nos falta lo básico: ¡Contar contigo en este día tan importante para nosotros!', 'Asi que por favor confirma lo que ya sabemos: ¡Que vienes seguro!'];
const events = [
    {
        eventName: 'BODA RELIGIOSA',
        place: 'TEMPLO SAN MATÍAS JALATLACO',
        time: 'X:00XX – X:00XX',
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