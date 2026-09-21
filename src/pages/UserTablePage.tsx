import { useUser } from "@/hooks/useUser";
import type { User } from "@/types";
import { useMemo, useState } from "react";
import { Link } from "react-router";

type columnKey = {
    id: string;
    label: string;
    get: (user: User) => string;
}
const columns: columnKey[] = [
    { id: 'name', label: 'name', get: user => user.name },
    { id: 'email', label: 'email', get: user => user.email },
    { id: 'city', label: 'city', get: user => user.address.city },
    { id: 'companyName', label: 'companyName', get: user => user.company.name },

]

type SortOrder = 'asc' | 'desc'

export default function UserTablePage() {
    const { users } = useUser();
    const [sortKey, setSortKey] = useState("name");
    const [order, setOrder] = useState<SortOrder>('asc');

    const visibleusers = useMemo(() => {


        const filtered = users;
        const columnSort = columns.find(column => column.id === sortKey);
        if (!columnSort) {
            return filtered;
        }
        const direction = order === 'asc' ? 1 : -1;
        return [...filtered].sort((a, b) => direction * columnSort.get(a).localeCompare(columnSort.get(b), undefined, {
            numeric: true,
            sensitivity: 'base'
        })
        )



    }, [users])

    return (
        <section className="page">
            <div className="page-header">
                <h1>Users</h1>
                <Link to="add" className="btn btn-primary">Add user</Link>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            {columns.map(({ id, label, get }) => {
                                return <th key={id}> {label}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {visibleusers.map(user =>
                            <tr key={user.id}>
                                {columns.map(({ id, get }) => {
                                    return <td key={id}> {get(user)}</td>
                                })}
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </section>
    )

}