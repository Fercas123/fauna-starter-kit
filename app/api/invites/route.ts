import {NextRequest, NextResponse} from "next/server";
import {getInvite, getInvites, updateInvite, createInvite} from '@/lib/fauna'

export const GET = async (request: NextRequest) => {
    const { query } = request;
    const code = query.code;
    if (code) {
        const invite = await getInvite(code)
        return NextResponse.json(invite)
    } else {
        const invites = await getInvites()
        return NextResponse.json(invites)
    }
};

export const PUT = async (request: NextRequest) => {
    const {code, data} = request
    if (code) {
        const updated = await updateInvite(code, data)
        return NextResponse.json(updated)
    } else {
        const initial = {
            code: '21',
            name: 'Mariana',
            guests: 1,
            phone: undefined,
            confirmedGuests: 0,
            rsvp: false,
            attending: false,
            message: undefined
        }
        const created = await createInvite(initial)
        return NextResponse.json(created)

    }
}