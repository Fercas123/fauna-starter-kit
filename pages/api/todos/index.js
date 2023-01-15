import { getTodo, getTodos, updateTodo} from '@/lib/fauna'

export default async function handler(req, res) {
  const handlers = {
    GET: async () => {
      if (req.code) {
        const todo = await getTodo(req.code)
        res.json(todo)
      } else {
        const todos = await getTodos()
        res.json(todos)
      }
    },

    PUT: async () => {
      const { code, data } = req.body
      const updated = await updateTodo(code, data)
      res.json(updated)
    }
  }

  if (!handlers[req.method]) {
    return res.status(405).end()
  }

  await handlers[req.method]()
}
