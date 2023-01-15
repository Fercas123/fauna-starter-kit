import useSWR from 'swr'
import 'tailwindcss/tailwind.css'

const fetcher = (url) => fetch(url).then((res) => res.json())

const TodosPage = () => {
    const {data: todos} = useSWR('/api/todos', fetcher)

    if (!todos) {
        return <div>Loading...</div>
    }

    return (
        <table className="table-auto border-collapse border border-slate-500 min-w-[80%] m-[2rem]">
            <thead className="border-b bg-gray-800">
            <tr>
                <th className="text-sm font-medium text-white px-6 py-4 text-left">#</th>
                <th className="text-sm font-medium text-white px-6 py-4 text-left">Codigo</th>
                <th className="text-sm font-medium text-white px-6 py-4 text-left">Nombre</th>
                <th className="text-sm font-medium text-white px-6 py-4 text-left">Invitados</th>
                <th className="text-sm font-medium text-white px-6 py-4 text-left">Invitados confirmados</th>
                <th className="text-sm font-medium text-white px-6 py-4 text-left">RSVP recibido</th>
                <th className="text-sm font-medium text-white px-6 py-4 text-left">Van a ir</th>
                <th className="text-sm font-medium text-white px-6 py-4 text-left">Mensaje</th>
            </tr>
            </thead>
            <tbody>
            {todos.data.map((todo, index) => (
                <tr key={todo.id} className="bg-gray-100 border-b">
                    <td>{index + 1}</td>
                    <td>{todo.code}</td>
                    <td>{todo.name}</td>
                    <td>{todo.guests}</td>
                    <td>{todo.confirmedGuests}</td>
                    <td>{todo.rsvp ? 'Claro que yes' : 'No han dicho'}</td>
                    <td>{todo.rsvp && todo.attending ? todo.attending ? 'Claro que yes' : 'No' : 'Tal vez'}</td>
                    <td>{todo.message}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default TodosPage