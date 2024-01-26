import useSWR from 'swr'
import 'tailwindcss/tailwind.css'
import {styles} from "./index";
import {constants} from '../constants';
import {useEffect, useState} from "react";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json())
const compareAscending = (a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
const compareDescending = (a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1;

const GuestsPage = () => {
    const {data: invites} = useSWR('/api/invites', fetcher)

    const [invitesList, setInvitesList] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [orderAscending, setOrderAscending] = useState(false);
    const [orderBy, setOrderBy] = useState('index');

    useEffect(() => {
        invites && invites.data && setInvitesList(invites.data)
    }, invites);

    useEffect(() => {
        let sortedList;
        if (orderBy === 'index') {
            sortedList = invitesList.sort(orderAscending ? (a, b) => a.code - b.code : (a, b) => b.code - a.code);
        } else {
            sortedList = invitesList.sort(orderAscending ? compareAscending : compareDescending);
        }
        setInvitesList(sortedList);
    }, [orderBy, orderAscending]);

    const Chevron = () => <span>{
        //    TODO: add chevron icon
    }</span>

    const handleReorder = (newOrderBy) => {
        if (orderBy !== newOrderBy) {
            setOrderBy(newOrderBy);
            setOrderAscending(true);
        } else setOrderAscending(!orderAscending);

    }
    if (!invites) {
        return <div>Loading...</div>
    }
    return (<>
            <header className={styles.header}>
                <div className={styles.headerLine}>
                    <h1 className={styles.headerNames}>{`${constants.bride} & ${constants.groom}`}</h1>
                    <p className={styles.headerEvent}>Lista de invitados</p>
                </div>
            </header>
            <main className={styles.main}>
                <div>
                    <button onClick={() => setShowFilters(!showFilters)}>Filters {showFilters ? '-' : '+'}</button>
                    {showFilters && <div>
                        {<label><input type="checkbox"/> RSVP Received</label>}
                        {<label><input type="checkbox"/> Attending</label>}
                         </div>}
                </div>
                <table className="table-auto border-collapse border border-slate-500 min-w-[80%] m-[2rem]">
                    <thead className="border-b bg-gray-800">
                    <tr>

                        <th className="text-sm font-medium text-white px-6 py-4 text-left">
                            <button onClick={() => handleReorder('index')}>
                                Code
                            </button>
                        </th>

                        <th className="text-sm font-medium text-white px-6 py-4 text-left">
                            <button onClick={() => handleReorder('name')}>
                                Name
                            </button>
                        </th>
                        <th className="text-sm font-medium text-white px-6 py-4 text-left">Passes</th>
                        <th className="text-sm font-medium text-white px-6 py-4 text-left">Confirmed guests</th>
                        <th className="text-sm font-medium text-white px-6 py-4 text-left">RSVP</th>
                        <th className="text-sm font-medium text-white px-6 py-4 text-left">Attending</th>
                        <th className="text-sm font-medium text-white px-6 py-4 text-left">Message</th>
                    </tr>
                    </thead>
                    <tbody>
                    {invitesList.map((invite, index) => (
                        <tr key={invite.id}
                            className={`${invite.rsvp && invite.attending ? invite.attending ? 'bg-green-100' : 'bg-red-100' : 'bg-gray-100'} border-b`}>
                            <td>{invite.code}</td>
                            <td>{invite.name}</td>
                            <td>{invite.guests}</td>
                            <td>{invite.confirmedGuests}</td>
                            <td>{invite.rsvp ? '✅' : '❔'}</td>
                            <td>{invite.rsvp && invite.attending ? invite.attending ? '✅' : '❌' : '❔'}</td>
                            <td>{invite.message}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </main>
        </>
    )
}

export default GuestsPage