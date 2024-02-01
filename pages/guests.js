import useSWR from 'swr';
import 'tailwindcss/tailwind.css';
import {styles} from './index';
import {constants} from '../constants';
import {useEffect, useState} from 'react';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json());

const compareNames = (a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase());
const compareCodes = (a, b) => a.code - b.code;

const GuestsPage = () => {
    const {data: invites, mutate: mutateInvites} = useSWR('/api/invites', fetcher);

    const [invitesList, setInvitesList] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [orderAscending, setOrderAscending] = useState(false);
    const [orderBy, setOrderBy] = useState('index');
    const [rsvpFilter, setRsvpFilter] = useState(false);
    const [attendingFilter, setAttendingFilter] = useState(false);

    useEffect(() => {
        if (invites && invites.data) {
            setInvitesList(invites.data);
        }
    }, [invites]);

    const handleReorder = (newOrderBy) => {
        if (orderBy !== newOrderBy) {
            setOrderBy(newOrderBy);
            setOrderAscending(true);
        } else {
            setOrderAscending(!orderAscending);
        }

        return mutateInvites(); // Trigger a re-fetch
    };

    const sortInvites = () => {
        const compareFunction = orderBy === 'index' ? compareCodes : compareNames;
        const sortedList = orderAscending ? [...invitesList].sort(compareFunction) : [...invitesList].sort(compareFunction).reverse();

        if (rsvpFilter) {
            return sortedList.filter((invite) => invite.rsvp);
        }

        if (attendingFilter) {
            return sortedList.filter((invite) => invite.attending);
        }

        return sortedList;
    };

    if (!invites) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerLine}>
                    <Link href={'/'}>
                        <h1 className={styles.headerNames}>{`${constants.bride} & ${constants.groom}`}</h1>
                    </Link>
                    <p className={styles.headerEvent}>Lista de invitados</p>
                </div>
            </header>
            <main className={styles.main}>
                <div>
                    <button onClick={() => setShowFilters(!showFilters)}>
                        Filters {showFilters ? '-' : '+'}
                    </button>
                    {showFilters && (
                        <div>
                            <label>
                                <input type="checkbox" onChange={() => setRsvpFilter(!rsvpFilter)}/> RSVP Received
                            </label>
                            <label>
                                <input type="checkbox" onChange={() => setAttendingFilter(!attendingFilter)}/> Attending
                            </label>
                        </div>
                    )}
                </div>
                <table className="table-auto border-collapse border border-slate-500 min-w-[80%] m-[2rem]">
                    <thead className="border-b bg-gray-800">
                    <tr>
                        <th className="text-sm font-medium text-white px-6 py-4 text-left">
                            <button onClick={() => handleReorder('index')}>Code</button>
                        </th>
                        <th className="text-sm font-medium text-white px-6 py-4 text-left">
                            <button onClick={() => handleReorder('name')}>Name</button>
                        </th>
                        <th className="text-sm font-medium text-white px-6 py-4 text-left">Passes</th>
                        <th className="text-sm font-medium text-white px-6 py-4 text-left">Confirmed guests</th>
                        <th className="text-sm font-medium text-white px-6 py-4 text-left">RSVP</th>
                        <th className="text-sm font-medium text-white px-6 py-4 text-left">Attending</th>
                        <th className="text-sm font-medium text-white px-6 py-4 text-left">Message</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortInvites().map((invite, index) => (
                        <tr
                            key={invite.id}
                            className={`${invite.rsvp && invite.attending ? invite.attending ? 'bg-green-100' : 'bg-red-100' : 'bg-gray-100'} border-b`}
                        >
                            <td>{invite.code}</td>
                            <td>{invite.name}</td>
                            <td>{invite.guests}</td>
                            <td>{invite.confirmedGuests}</td>
                            <td>{invite.rsvp ? '✅' : '❔'}</td>
                            <td>{!invite.rsvp ? '❔' : invite.attending ? '✅' : '❌'}</td>
                            <td>{invite.message}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </main>
        </>
    );
};

export default GuestsPage;