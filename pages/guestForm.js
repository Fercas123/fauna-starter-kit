import {useState} from 'react'
import 'tailwindcss/tailwind.css'
import cn from "classnames";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";

const EntryForm = ({todo, onSubmit: onSubmitProps}) => {
    const initial = {
        text: todo.text,
        completed: todo.completed,
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

    return (
        <>
            <form className="flex relative my-4" onSubmit={onSubmit}>
                <label>
                    Text:
                </label>
                <input
                    required
                    className={cn(inputClasses, 'w-1/3 mr-2 px-4')}
                    aria-label="Your name"
                    placeholder="Your name..."
                    value={values.text}
                    onChange={makeOnChange('text')}
                />
                <label>
                    Completed:
                </label>
                <input
                    type="checkbox"
                    required
                    className={cn(inputClasses, 'pl-4 pr-32 flex-grow')}
                    aria-label="Your message"
                    placeholder="Your message..."
                    value={values.completed}
                    onChange={makeOnChange('completed')}
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
                failed: () => <ErrorMessage>Tuvimos un error. Por favor intenta de nuevo :(</ErrorMessage>,

                submitted: () => (
                    <SuccessMessage>Gracias por mandar tu respuesta.</SuccessMessage>
                ),
            }[formState]?.()}
        </>
    )
}
export default EntryForm
