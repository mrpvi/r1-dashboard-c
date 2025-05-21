export type PaginationProps = {
    currentPage: number;
    totalPages: number;
    baseUrl?: string;
    onPageChange?: (page: number) => void;
}