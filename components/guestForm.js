import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import cn from 'classnames';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import SuccessMessage from '@/components/SuccessMessage';

const EntryForm = ({ invite, onSubmit: onSubmitProp }) => {
  const initial = {
    name: invite && invite.name,
    phone: (invite && invite.phone) || undefined,
    confirmedGuests: undefined,
    rsvp: true,
    attending: true,
    message: (invite && invite.message) || undefined,
  };
  const [values, setValues] = useState(initial);
  const [formState, setFormState] = useState('initial');
  const isSubmitting = formState === 'submitting';

  const onSubmit = (ev) => {
    ev.preventDefault();

    setFormState('submitting');
    onSubmitProp({ code: invite && invite.code, data: values })
      .then(() => {
        setValues(initial);
        setFormState('submitted');
      })
      .catch(() => {
        setFormState('failed');
      });
  };

  const updateField =
    (fieldName) =>
    ({ target: { type, value, checked } }) => {
      setValues({
        ...values,
        [fieldName]:
          type === 'checkbox'
            ? checked
            : type === 'select-one'
              ? parseInt(value, 10)
              : value,
      });
    };

  const updateAttendance =
    () =>
    ({ target: { value } }) => {
      setValues({
        ...values,
        confirmedGuests: parseInt(value, 10),
        attending: parseInt(value, 10) > 0,
      });
    };

  const inputClasses = cn(
    'block py-2 bg-white dark:bg-gray-800',
    'rounded-md border-gray-300 focus:ring-blue-500',
    'focus:border-blue-500 text-gray-900 dark:text-gray-100'
  );

  return (
    <>
      <form
        className=' m-auto my-4 flex max-w-[800px] flex-col items-end bg-gray-100 bg-gray-100 p-4'
        onSubmit={onSubmit}
      >
        <div className='my-4 flex flex-wrap gap-[1rem] p-4 '>
          <div className='flex min-w-[20%] flex-col items-start'>
            <label htmlFor='code'>Código de acceso*</label>
            <input
              required
              disabled
              className={cn(inputClasses, 'className="w-full" mr-2 px-[1rem]')}
              aria-label='Código de acceso'
              placeholder='Por favor, por el código que viene en tu invitacion'
              value={invite && invite.code}
            />
          </div>
          <div className='flex min-w-[44%] flex-col items-start'>
            <label htmlFor='name'>Nombre/Nombres*</label>
            <input
              required
              className={cn(inputClasses, 'mr-2 w-full px-4')}
              aria-label='Nombre'
              placeholder='Nombre / Nombres'
              value={values.name}
              onChange={updateField('name')}
            />
          </div>
          <div className='flex min-w-[23%] flex-col items-start'>
            <label htmlFor='phone'>Teléfono</label>
            <input
              className={cn(inputClasses, 'mr-2 w-full px-4')}
              aria-label='phone'
              placeholder='Teléfono.'
              value={values.phone}
              onChange={updateField('phone')}
            />
          </div>
          <div className='flex min-w-[20%] flex-col items-start'>
            <label htmlFor='confirmedGuests'>Número de asistentes*</label>
            <select
              className={cn(inputClasses, 'mr-2 w-full px-[0.4rem]')}
              required
              id='confirmedGuests'
              value={values.confirmedGuests}
              onChange={updateAttendance()}
              defaultValue='Selecciona una opción'
            >
              <option value={undefined} disabled>
                Selecciona una opción
              </option>
              <option value={0}>No voy a ir</option>
              {Array.from({ length: invite && invite.guests }, (_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div className='flex min-w-[73%] flex-col items-start'>
            <label htmlFor='message'>
              Si deseas, puedes agregar un mensaje.
            </label>
            <input
              className={cn(inputClasses, 'w-full flex-grow pl-4 pr-32')}
              aria-label='Mensaje'
              placeholder='Your message...'
              value={values.message}
              onChange={updateField('message')}
            />
          </div>
        </div>
        <button
          className={cn(
            'flex items-center justify-center',
            'h-8 px-4 font-bold',
            'bg-gray-100 text-gray-900 dark:bg-gray-700',
            'mr-3 w-28 rounded dark:text-gray-100'
          )}
          type='submit'
          disabled={isSubmitting || values.confirmedGuests === undefined}
        >
          {isSubmitting ? <LoadingSpinner /> : 'RSVP'}
        </button>
      </form>
      {{
        failed: () => (
          <ErrorMessage>
            Tuvimos un error. Por favor intenta de nuevo :(
          </ErrorMessage>
        ),

        submitted: () => (
          <SuccessMessage>Gracias por mandar tu respuesta.</SuccessMessage>
        ),
      }[formState]?.()}
    </>
  );
};
export default EntryForm;
