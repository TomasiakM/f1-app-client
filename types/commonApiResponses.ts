export interface IPaginatedResponse<TData>{
    page: number;
    pageSize: number;
    totalPages: number;
    items: TData[];
}