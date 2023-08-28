export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
}

export interface QueryOptions {
    pageIndex?: number,
    rowNumber?: number
}