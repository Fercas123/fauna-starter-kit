import {format} from "date-fns";
import localeEs from "date-fns/locale/es";
import {constants} from '../public/static/constants';
import GuestForm from '@/components/guestForm'


const RsvpForm = ({invite}) => {
    console.log(invite)
    const {contactNumber, replyBefore} = constants;
    return (<>
            <hr className="separator"/>
            <section className="py-[2rem] text-center" id="rsvp">
                <h5 className='text-lg md:text-xl font-bold text-gray-900'>
                    RSVP
                </h5>
                {(!invite || invite.rsvp !== true)
                    ? <p className="my-1 text-gray-800">
                        {`Por favor confirma tu asistencia antes del ${format(replyBefore, 'dd', {locale: localeEs})} de ${format(replyBefore, 'MMMM', {locale: localeEs})}, esperamos poder celebrar
                        contigo!`}
                    </p>
                    : <>
                        <h3 className="text-gray-600 pb-[1rem]">GRACIAS POR MANDAR TU RESPUESTA!</h3>
                        <p>{`Respondiste que ${invite.attending === true ? 'si' : 'no'} vas a ir.`}</p>
                        <p>Si quieres modificar tu asistencia, por favor mandanos un mensaje al número de
                            WhatsApp</p>
                    </>
                }
                {(invite && invite.rsvp !== true) && <GuestForm invite={invite}/>}
                <p className="text-gray-600 pb-[1rem]">{`TELÉFONO / WHATSAPP: ${contactNumber}`}</p>
            </section>
        </>
    )
}

export default RsvpForm