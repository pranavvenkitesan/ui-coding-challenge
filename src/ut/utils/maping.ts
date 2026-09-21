import type { formInput, UserInput } from "@/types"

export const Emptyuser: formInput = {
    name: "",
    email: "",
    city: "",
    company: ""
}

export function formToUser(value: formInput): UserInput {

    return {
        name: value.name,
        email: value.email,
        address: {
            city: value.city
        },
        company: {
            name: value.company
        }
    }

}