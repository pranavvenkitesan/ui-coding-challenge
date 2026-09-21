import type { formInput, User } from "@/types";
import { useOutletContext } from "react-router";
export type UserContext = {
    users: User[],
    addUser: (values: formInput) => Promise<void>;
}

export function useUser() {

    return useOutletContext<UserContext>();

}