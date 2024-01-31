import useSWR, {mutate, SWRConfig} from 'swr'
import AppHead from "@/components/head";
import {styles} from "./index";
import {constants} from "../public/static/constants";
import cn from "classnames";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import {useState} from "react";

const putInvite = (payload) =>
    fetch('/api/invites', {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => (res.ok ? res.json() : Promise.reject(res)))

const useNewCardFlow = () => {
    const submitForm = async (payload) => {
        await putInvite(payload)
        await mutate('/api/invites')
    }

    return {submitForm}
}

const NewInvite = ({fallback}) => {
    const {submitForm} = useNewCardFlow();

    const initial = {
        code: undefined,
        name: undefined,
        guests: 0,
        phone: undefined,
        confirmedGuests: 0,
        rsvp: false,
        attending: false,
        message: undefined
    }
    const [values, setValues] = useState(initial)
    const [formState, setFormState] = useState('initial')
    const isSubmitting = formState === 'submitting'
    const onSubmit = (ev) => {
        console.log('submitting')
        ev.preventDefault();
        console.log(values)
        setFormState('submitting');
        submitForm({data: values})
            .then(() => {
                setValues(initial)
                setFormState('submitted')
            })
            .catch(() => {
                setFormState('failed')
            })
    }
    const updateField =
        (fieldName) =>
            ({target: {type, value, checked}}) => {
                setValues({
                    ...values,
                    [fieldName]: type === 'checkbox' ? checked : type === "number" ? parseInt(value, 10) : value,
                })
            }


    const inputClasses = cn(
        'block py-2 bg-white dark:bg-gray-800',
        'rounded-md border-gray-300 focus:ring-blue-500',
        'focus:border-blue-500 text-gray-900 dark:text-gray-100'
    )
    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerLine}>
                    <h1 className={styles.headerNames}>{`${constants.bride} & ${constants.groom}`}</h1>
                    <p className={styles.headerEvent}>Crear invitacion</p>
                </div>
            </header>
            <form className=" flex flex-col items-end my-4 bg-gray-100 p-4 max-w-[800px] m-auto bg-gray-100" onSubmit={onSubmit}>
                <div
                    className="flex flex-wrap gap-[1rem] my-4 p-4 "
                >
                    <div className="flex flex-col items-start min-w-[20%]">
                        <label htmlFor="code">Código de acceso*</label>
                        <input
                            required
                            className={cn(inputClasses, 'mr-2 px-[1rem] className="w-full"')}
                            aria-label="Código de acceso"
                            value={values.code}
                            onChange={updateField('code')}
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
                            onChange={updateField('name')}
                        />
                    </div>
                    <div className="flex flex-col items-start min-w-[20%]">
                        <label htmlFor="guests">Número de asistentes*</label>
                        <input
                            type='number'
                            required
                            aria-label="Asistentes"
                            value={values.guests}
                            onChange={updateField('guests')}

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
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <LoadingSpinner/> : 'Create'}
                </button>
            </form>
            {{
                failed: () => <ErrorMessage>Tuvimos un error. Por favor intenta de nuevo :(</ErrorMessage>,

                submitted: () => (
                    <SuccessMessage>Invitacion creada</SuccessMessage>
                ),
            }[formState]?.()}
        </>
    )
}
export default NewInvite