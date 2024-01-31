'use server'
import {getInvite} from '@/lib/fauna'
import { revalidatePath } from 'next/cache'

export const fetchInvite = async (code) => {
    if (code) {
        await getInvite(code)
        // revalidatePath('/invites')
    }
}
