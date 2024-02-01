import { getInvite, getInvites, updateInvite, createInvite } from '@/lib/fauna';

export default async function handler(req, res) {
  const handlers = {
    GET: async () => {
      if (req.code) {
        const invite = await getInvite(req.code);
        res.json(invite);
      } else {
        const invites = await getInvites();
        res.json(invites);
      }
    },

    PUT: async () => {
      const { code, data } = req.body;
      if (code) {
        const updated = await updateInvite(code, data);
        res.json(updated);
      } else {
        const created = await createInvite(data);
        res.json(created);
      }
    },
  };

  if (!handlers[req.method]) {
    return res.status(405).end();
  }

  await handlers[req.method]();
}
