import { getInvite, updateInvite} from '@/lib/fauna'

export default async function handler(req, res) {
    const handlers = {
        GET: async () => {
            const invite = await getInvite(req.code)
            res.json(invite)
        },

        PUT: async () => {
            const { code, data } = req.body
            const updated = await updateInvite(code, data)
            res.json(updated)
        }
    }

    if (!handlers[req.method]) {
        return res.status(405).end()
    }

    await handlers[req.method]()
}
