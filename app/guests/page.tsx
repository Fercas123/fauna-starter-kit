import 'tailwindcss/tailwind.css'
import {getInvites} from '@/lib/fauna'
import GuestList from "@/components/GuestList";

const getData = async () => await getInvites();

const GuestsPage = async () => {
    const invites = await getData();
    return (!invites || invites.length > 1) ? <div>Loading...</div> : <GuestList invites={invites.data}/>;
}

export default GuestsPage