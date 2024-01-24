export interface BrandReturnDto {
  id: number;
  name: BrandName;
}

export interface BrandCreateDto {
  name: BrandName;
}

export enum BrandName {
  BMW = 'BMW',
  AUDI = 'AUDI',
  VW = 'VW',
}