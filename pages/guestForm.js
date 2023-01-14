import {useState} from 'react'
import 'tailwindcss/tailwind.css'
import cn from "classnames";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";

const EntryForm = ({todo, onSubmit: onSubmitProps}) => {
    const initial = {
        name: todo.name,
        phone: todo.phone || undefined,
        confirmedGuests: undefined,
        rsvp: true,
        attending: true,
        message: todo.message || undefined
    }
    const [values, setValues] = useState(initial)
    const [formState, setFormState] = useState('initial')
    const isSubmitting = formState === 'submitting'

    const onSubmit = (ev) => {
        ev.preventDefault()

        setFormState('submitting');
        onSubmitProps({code: todo.code, data: values})
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

    const inputClasses = cn(
        'block py-2 bg-white dark:bg-gray-800',
        'rounded-md border-gray-300 focus:ring-blue-500',
        'focus:border-blue-500 text-gray-900 dark:text-gray-100'
    )

    return (todo.rsvp === true
            ? <>
                <h3>Gracias por contestar el formulario!</h3>
                <p>Si quieres modificar tu asistencia, por favor mandanos un mensaje al numero de Whatsapp</p>
            </>
            : <>
            <form className="flex flex-wrap gap-[1rem] my-4" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="code">Codigo de acceso*</label>
                    <input
                        required
                        disabled
                        className={cn(inputClasses, 'mr-2 px-[1rem]')}
                        aria-label="Codigo de acceso"
                        placeholder="Por favor, por el codigo que viene en tu invitacion"
                        value={todo.code}
                    />
                </div>
                <div>
                    <label htmlFor="name">Nombre/Nombres*</label>
                    <input
                        required
                        className={cn(inputClasses, 'mr-2 px-4')}
                        aria-label="Nombre"
                        placeholder="Nombre / Nombres"
                        value={values.name}
                        onChange={makeOnChange('name')}
                    />
                </div>
                <div>
                    <label htmlFor="phone">Por favor danos un numero en caso de que tengamos que contactarte</label>
                    <input
                        className={cn(inputClasses, 'mr-2 px-4')}
                        aria-label="phone"
                        placeholder="Telefono."
                        value={values.phone}
                        onChange={makeOnChange('phone')}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="confirmedGuests">Numero de invitados*</label>
                    <select className={cn(inputClasses, 'mr-2 px-4')} required name="confirmedGuests" id="confirmedGuests" value={values.confirmedGuests} onChange={makeOnChange('confirmedGuests')}>
                        <option value={undefined}>-Selecciona una opcion-</option>
                        {Array.from({length: todo.guests}, (_, index) => <option key={index} value={index + 1}>{index + 1}</option>)}
                    </select>
                </div>
                <div  className="flex flex-col">

                    <label htmlFor="attending">RSVP*</label>
                    <div>
                        <input
                            type="checkbox"
                            id="attending"
                            onChange={makeOnChange('attending')}
                            className={cn(inputClasses, 'w-1/3 mr-2 px-4')}
                        /> <label>Si, voy a estar ahi!</label>
                    </div>

                </div>
                <div>
                    <label htmlFor="message">Si deseas, puedes agregar un mensaje.</label>
                    <input
                        className={cn(inputClasses, 'pl-4 pr-32 flex-grow')}
                        aria-label="Mensaje"
                        placeholder="Your message..."
                        value={values.message}
                        onChange={makeOnChange('message')}
                    />
                </div>
                <button
                    className={cn(
                        'flex items-center justify-center',
                        'px-4 font-bold h-8',
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
                failed: () => <ErrorMessage>Tuvimos un error. Por favor intenta de nuevo :(</ErrorMessage>,

                submitted: () => (
                    <SuccessMessage>Gracias por mandar tu respuesta.</SuccessMessage>
                ),
            }[formState]?.()}
        </>
    )
}
export default EntryForm
