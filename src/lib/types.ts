export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Slice<T> {
    content: T[];
    pageable: Pageable;
    size: number;
    number: number; // Current Page Number
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
    hasNext?: boolean; // Sometimes specific to implementation, but useful
}
