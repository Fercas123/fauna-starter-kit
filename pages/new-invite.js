import { mutate } from 'swr';
import cn from 'classnames';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import SuccessMessage from '@/components/SuccessMessage';
import { useState } from 'react';

const putInvite = (payload) =>
  fetch('/api/invites', {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));

const useNewCardFlow = () => {
  const submitForm = async (payload) => {
    await putInvite(payload);
    await mutate('/api/invites');
  };

  return { submitForm };
};

const NewInvite = ({ fallback }) => {
  const { submitForm } = useNewCardFlow();

  const initial = {
    code: undefined,
    name: undefined,
    guests: 0,
    phone: undefined,
    confirmedGuests: 0,
    rsvp: false,
    attending: false,
    message: undefined,
  };
  const [formState, setFormState] = useState('initial');
  const isSubmitting = formState === 'submitting';
  const onSubmit = (ev) => {
    ev.preventDefault();
    setFormState('submitting');
    const formData = new FormData(ev.target);

    const payload = {
      code: undefined,
      name: undefined,
      guests: 0,
      phone: undefined,
      confirmedGuests: 0,
      rsvp: false,
      attending: false,
      message: undefined,
    };
    formData.forEach((value, key) => {
      payload[key] = key === 'guests' ? parseInt(value, 10) : value;
    });
    submitForm({ data: payload })
      .then(() => {
        setFormState('submitted');
      })
      .catch(() => {
        setFormState('failed');
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
              className={cn(inputClasses, 'className="w-full" mr-2 px-[1rem]')}
              aria-label='Código de acceso'
              name='code'
            />
          </div>
          <div className='flex min-w-[44%] flex-col items-start'>
            <label htmlFor='name'>Nombre/Nombres*</label>
            <input
              required
              className={cn(inputClasses, 'mr-2 w-full px-4')}
              aria-label='Nombre'
              placeholder='Nombre / Nombres'
              name='name'
            />
          </div>
          <div className='flex min-w-[20%] flex-col items-start'>
            <label htmlFor='guests'>Número de asistentes*</label>
            <input
              type='number'
              required
              aria-label='Asistentes'
              name='guests'
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
          disabled={isSubmitting}
        >
          {isSubmitting ? <LoadingSpinner /> : 'Create'}
        </button>
      </form>
      {{
        failed: () => (
          <ErrorMessage>
            Tuvimos un error. Por favor intenta de nuevo :(
          </ErrorMessage>
        ),

        submitted: () => <SuccessMessage>Invitacion creada</SuccessMessage>,
      }[formState]?.()}
    </>
  );
};
export default NewInvite;
