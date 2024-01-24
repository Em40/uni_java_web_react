export interface FuelTypeReturnDto {
  id: number;
  name: FuelTypeName;
}

export interface FuelTypeCreateDto {
  name: FuelTypeName;
}

export enum FuelTypeName {
  GAS = 'GAS',
  GASOLINE = 'GASOLINE',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC'
}