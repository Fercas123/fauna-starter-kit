// CONSTANTS
import { isAfter } from 'date-fns';

const date = new Date('12/12/2024 15:00:00 UTC-06:00');
//
const now = new Date(); // Do not change
const married = isAfter(date, now); // Do not change
//
const bride = 'Novia';
const groom = 'Novio';
const header = 'Nuestra Boda';
const place = 'Estado, Pais';
const contactNumber = '951 XXX XXX';
const replyBefore = new Date('03/20/2023 15:00:00 UTC-06:00');
const introParagraphs = married
  ? [
      'Lo tenemos todo. El traje, el lugar, las flores, el mezcal...',
      'Pero nos falta lo básico: ¡Contar contigo en este día tan importante para nosotros!',
      'Asi que por favor confirma lo que ya sabemos: ¡Que vienes seguro!',
    ]
  : [
      'Lo tenemos todo. El traje, el lugar, las flores, el mezcal...',
      'Pero nos falta lo básico: ¡Contar contigo en este día tan importante para nosotros!',
      'Asi que por favor confirma lo que ya sabemos: ¡Que vienes seguro!',
    ];
const events = [
  {
    eventName: 'BODA RELIGIOSA',
    place: 'TEMPLO XXXX',
    time: 'X:00XX – X:00XX',
    address: {
      link: 'https://goo.gl/maps/',
      addessLines: ['address line 1', 'address line 2', 'address line 3'],
    },
  },
  {
    eventName: 'BODA CIVIL Y FIESTA',
    place: 'SALON XXXXX',
    time: 'X:00PM – X:00AM',
    address: {
      link: 'https://goo.gl/maps/',
      addessLines: ['address line 1', 'address line 2', 'address line 3'],
    },
  },
];

const giftRegistry = {
  intro: [
    'El mejor regalo que nos puedes dar es tu presencia,',
    'pero si quieres obsequiarnos algo puedes hacerlo de dos formas:',
  ],
  registries: [
    {
      name: 'Amazon',
      link: 'https://www.amazon.com.mx/wedding/',
    },
    {
      name: 'Liverpool',
      link: 'https://mesaderegalos.liverpool.com.mx/milistaderegalos/',
    },
  ],
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
  giftRegistry,
};
