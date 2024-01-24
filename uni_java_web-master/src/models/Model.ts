import { BrandName, BrandReturnDto } from "./Brand";

export interface ModelReturnDto{
  id: number;
  name: ModelName;
  brand: BrandReturnDto;
}

export interface ModelCreateDto{
  name: ModelName;
  brandId: number;
}

export enum ModelName {
  Q7 = 'Q7',
  Q5 = 'Q5',
  X4 = 'X4'
}

export interface ModelDisplay{
  id: number;
  name: ModelName;
  brandId: number;
  brandName: BrandName;
}

