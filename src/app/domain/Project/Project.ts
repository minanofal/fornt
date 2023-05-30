export interface SearchProject {
    developerId: number;
    cityId: number;
    areaId: number;
    name: string;
    nameInArabic: string;
    take: number,
    skip: number,
    pageIndex: number,
}

export interface ProjectLite {
    id : number;
    name: string;
    cityName: string;
    isPublish: boolean;
    developerName: string;
    image: string;
}
export interface ResponsProjects{
    items : ProjectLite[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

export interface ProjecrImage{
    id: number;
    storageFileId: number;
    isMain: boolean;
    image: Uint8Array;
} 

export interface Project{
    id: number;
    name: string;
    description: string;
    nameInArabic: string;
    descriptionInArabic: string;
    loacationUrl: string;
    areaId: number;
    displayOrder: number;
    videoUrl: string;
    developerId:number;
    isPublished: boolean;
    mainImage: ProjecrImage;
    images: ProjecrImage[];
    deleveryDate: string;
}

export interface CreateProject{
    id: number;
    name: string;
    description: string;
    nameInArabic: string;
    descriptionInArabic: string;
    loacationUrl: string;
    areaId: number;
    displayOrder: number;
    VideoUrl: string;
    developerId:number;
    deleveryDate: string;
}
export interface NewImage{
    id: number,
    url: string;
    image: File,
}