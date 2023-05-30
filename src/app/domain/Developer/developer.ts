export interface SearchDeveloper{
    nameInArabic: string,
    name : string,
    take: number,
    skip: number,
    pageIndex: number,
}
export interface DeveloperLite{
    id: number;
    picture: Uint8Array;
    name: string;
    nameInArabic: string;
    isTopDeveloper: boolean;
}
export interface ResponsDeveloper{
    items : DeveloperLite[],
    pageIndex: number,
    pageSize: number,
    totalCount: number,
    totalPages: number,
}
export interface Developer{
    id: number;
    picture: Uint8Array;
    name: string;
    nameInArabic: string;
    description: string;
    descriptionInArabic: string;
    storageFileId: number;
    desplayOrder: number;
}
export interface DeveloperCreate{
    id: number;
    picture: File;
    name: string;
    nameInArabic: string;
    description: string;
    descriptionInArabic: string;
    storageFileId: number;
    desplayOrder: number;
}