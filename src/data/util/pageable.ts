export interface PageableRequest {
  page: number;
  size: number;
  sort: string;
}

export interface PageableResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: string;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable<T> extends PageableResponse<T> {
  pageable: PageableRequest;
}

