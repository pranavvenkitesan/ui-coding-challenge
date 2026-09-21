import { addUser as postUser, fetchUsers } from "@/api/user";
import type { formInput, User } from "@/types";
import { formToUser } from "@/ut/utils/maping";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router";

type LoadSate = { status: "loading" } | { status: 'error', error: string } | { status: 'ready' };
export default function UserLayout() {

    const [users, setUsers] = useState<User[]>([]);
    const [load, setLoad] = useState<LoadSate>({ status: 'loading' })

    useEffect(() => {

        const controller = new AbortController();

        fetchUsers(controller.signal).then(users => {

            setUsers(users);
            setLoad({ status: 'ready' });
        }).catch((error) => {
            if (controller.signal.aborted) return;
            setLoad({ error: error instanceof Error ? error.message : String(error), status: 'error' });
        })

        return () => controller.abort();

    }, [])

    const addUser = useCallback(async (values: formInput) => {
        const created = await postUser(formToUser(values));
        setUsers(prev => [...prev, { ...created, id: crypto.randomUUID() }]);

    }, [])
    const context = useMemo(() => ({ users, addUser }), [users, addUser]);

    if (load.status === 'loading') {
        return <p> Loading...</p>
    } else if (load.status === 'error') {
        return <p role="alert">{load.error}</p>
    }




    return <Outlet context={context} />

}