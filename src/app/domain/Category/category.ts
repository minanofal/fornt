export interface CategorySearch{
    nameInArabic: string;
    name: string;
}
export interface CategoryLite{
    id: number;
    name: string;
    nameInArabic: string;
}
export interface Category{
    id: number;
    name: string;
    nameInArabic: string;
    displayOrder: number;
}