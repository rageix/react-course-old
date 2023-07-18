export interface IPaginationItem {
    label: string,
    page: number,
    active: boolean
}

export interface IPagination {
    page: number,
    perPage: number,
    totalPages: number,
    totalItems: number
}
