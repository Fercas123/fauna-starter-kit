import {useState} from 'react'
import 'tailwindcss/tailwind.css'
import cn from "classnames";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";

const EntryForm = ({onSubmit: onSubmitProp}) => {
    const initial = {
        name: '',
        message: '',
    }
    const [values, setValues] = useState(initial)
    const [formState, setFormState] = useState('initial')
    const isSubmitting = formState === 'submitting'

    const onSubmit = (ev) => {
        ev.preventDefault()

        setFormState('submitting')
        onSubmitProp(values)
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
            ({target: {value}}) =>
                setValues({
                    ...values,
                    [fieldName]: value,
                })

    const inputClasses = cn(
        'block py-2 bg-white dark:bg-gray-800',
        'rounded-md border-gray-300 focus:ring-blue-500',
        'focus:border-blue-500 text-gray-900 dark:text-gray-100'
    )

    return (
        <>
            <form className="flex relative my-4" onSubmit={onSubmit}>
                <input
                    required
                    className={cn(inputClasses, 'w-1/3 mr-2 px-4')}
                    aria-label="Your name"
                    placeholder="Your name..."
                    value={values.name}
                    onChange={makeOnChange('name')}
                />
                <input
                    required
                    className={cn(inputClasses, 'pl-4 pr-32 flex-grow')}
                    aria-label="Your message"
                    placeholder="Your message..."
                    value={values.message}
                    onChange={makeOnChange('message')}
                />
                <button
                    className={cn(
                        'flex items-center justify-center',
                        'absolute right-1 top-1 px-4 font-bold h-8',
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
                failed: () => <ErrorMessage>Something went wrong. :(</ErrorMessage>,

                submitted: () => (
                    <SuccessMessage>Thanks for signing the guestbook.</SuccessMessage>
                ),
            }[formState]?.()}
        </>
    )
}
export default EntryForm
