"use client"
import {useEffect, useState} from "react";

const compareAscending = (a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
const compareDescending = (a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1;

const GuestList = ({ invites }) => {
    const [invitesList, setInvitesList] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [orderAscending, setOrderAscending] = useState(false);
    const [orderBy, setOrderBy] = useState('index');

    useEffect(() => {
        console.log('setting')
        invites && setInvitesList(invites.sort((a, b) => a.code - b.code))
    }, invites);

    const handleReorder = (newOrderBy) => {
        console.log('ordering', orderBy ,newOrderBy)
        let sortedList;
        if (orderBy !== newOrderBy) {
            setOrderBy(newOrderBy);
            setOrderAscending(true);
        } else {
            setOrderAscending(!orderAscending);
        }
        if (orderBy === 'index') {
            sortedList = invitesList.sort(orderAscending ? (a, b) => a.code - b.code : (a, b) => b.code - a.code);
        } else {
            sortedList = invitesList.sort(orderAscending ? compareAscending : compareDescending);
        }
        setInvitesList(sortedList);
    }
    return (
        <>
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

                    <th className="table-header">
                        <button onClick={() => handleReorder('index')}>
                            Code
                        </button>
                    </th>

                    <th className="table-header">
                        <button onClick={() => handleReorder('name')}>
                            Name
                        </button>
                    </th>
                    <th className="table-header">Passes</th>
                    <th className="table-header">Confirmed guests</th>
                    <th className="table-header">RSVP</th>
                    <th className="table-header">Attending</th>
                    <th className="table-header">Message</th>
                </tr>
                </thead>
                <tbody>
                {invitesList && invitesList.map((invite, index) => (
                    <tr key={`${index}_${invite.id}`}
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
        </>
    )
}

export default GuestList