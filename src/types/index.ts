// Shared domain types live here.
export type Id = string | number


export type AddressType = {
    city: string;
}
export type CompanyType = {
    name: string;
}
export type User = {
    id: Id;
    name: string;
    email: string;
    address: AddressType;
    company: CompanyType;
}

export type UserInput = Omit<User, 'id'>;

export type formInput = {
    name: string;
    email: string;
    city: string;
    company: string;

}