import {useState} from 'react'
import 'tailwindcss/tailwind.css'
import cn from "classnames";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";

const EntryForm = ({invite, onSubmit: onSubmitProps}) => {
    const initial = {
        name: invite && invite.name,
        phone: invite && invite.phone || undefined,
        confirmedGuests: undefined,
        rsvp: true,
        attending: true,
        message: invite && invite.message || undefined
    }
    const [values, setValues] = useState(initial)
    const [formState, setFormState] = useState('initial')
    const isSubmitting = formState === 'submitting'

    const onSubmit = (ev) => {
        ev.preventDefault()

        setFormState('submitting');
        onSubmitProps({code: invite && invite.code, data: values})
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
            ({target: {type, value, checked}}) => {
                setValues({
                    ...values,
                    [fieldName]: type === 'checkbox' ? checked : type === "select-one" ? parseInt(value, 10) : value,
                })
            }

    const makeDoubleOnChange =
        () => ({target: {value}}) => {
            setValues({
                ...values,
                'confirmedGuests': parseInt(value, 10),
                'attending': parseInt(value, 10) > 0,
            })
        }

    const inputClasses = cn(
        'block py-2 bg-white dark:bg-gray-800',
        'rounded-md border-gray-300 focus:ring-blue-500',
        'focus:border-blue-500 text-gray-900 dark:text-gray-100'
    )

    return (<>
            <form className=" flex flex-col items-end my-4 bg-gray-100 p-4 max-w-[800px] m-auto bg-gray-100" onSubmit={onSubmit}>
                <div
                    className="flex flex-wrap gap-[1rem] my-4 p-4 "
                >
                    <div className="flex flex-col items-start min-w-[20%]">
                        <label htmlFor="code">Código de acceso*</label>
                        <input
                            required
                            disabled
                            className={cn(inputClasses, 'mr-2 px-[1rem] className="w-full"')}
                            aria-label="Código de acceso"
                            placeholder="Por favor, por el código que viene en tu invitacion"
                            value={invite && invite.code}
                        />
                    </div>
                    <div className="flex flex-col items-start min-w-[44%]">
                        <label htmlFor="name">Nombre/Nombres*</label>
                        <input
                            required
                            className={cn(inputClasses, 'mr-2 px-4 w-full')}
                            aria-label="Nombre"
                            placeholder="Nombre / Nombres"
                            value={values.name}
                            onChange={makeOnChange('name')}
                        />
                    </div>
                    <div className="flex flex-col items-start min-w-[23%]">
                        <label htmlFor="phone">Teléfono</label>
                        <input
                            className={cn(inputClasses, 'mr-2 px-4 w-full')}
                            aria-label="phone"
                            placeholder="Teléfono."
                            value={values.phone}
                            onChange={makeOnChange('phone')}
                        />
                    </div>
                    <div className="flex flex-col items-start min-w-[20%]">
                        <label htmlFor="confirmedGuests">Número de asistentes*</label>
                        <select className={cn(inputClasses, 'mr-2 px-[0.4rem] w-full')} required id="confirmedGuests"
                                value={values.confirmedGuests} onChange={makeDoubleOnChange()}>
                            <option value={undefined} disabled selected>Selecciona una opción</option>
                            <option value={0}>No voy a ir</option>
                            {Array.from({length: invite && invite.guests}, (_, index) => <option key={index}
                                                                                             value={index + 1}>{index + 1}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col items-start min-w-[73%]">
                        <label htmlFor="message">Si deseas, puedes agregar un mensaje.</label>
                        <input
                            className={cn(inputClasses, 'pl-4 pr-32 flex-grow w-full')}
                            aria-label="Mensaje"
                            placeholder="Your message..."
                            value={values.message}
                            onChange={makeOnChange('message')}
                        />
                    </div>
                </div>
                <button
                    className={cn(
                        'flex items-center justify-center',
                        'px-4 font-bold h-8',
                        'bg-gray-100 dark:bg-gray-700 text-gray-900',
                        'dark:text-gray-100 rounded w-28 mr-3'
                    )}
                    type="submit"
                    disabled={isSubmitting || values.confirmedGuests === undefined}
                >
                    {isSubmitting ? <LoadingSpinner/> : 'RSVP'}
                </button>
            </form>
            {{
                failed: () => <ErrorMessage>Tuvimos un error. Por favor intenta de nuevo :(</ErrorMessage>,

                submitted: () => (
                    <SuccessMessage>Gracias por mandar tu respuesta.</SuccessMessage>
                ),
            }[formState]?.()}
        </>
    )
}
export default EntryForm
