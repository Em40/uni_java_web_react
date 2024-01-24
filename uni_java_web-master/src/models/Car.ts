import { BrandName, BrandReturnDto } from "./Brand";
import { ModelName } from "./Model"

export default interface Car {
  id: number,
  price: number,
  vinNumber: string,
  date: Date | string,
  remarks: string,
  model: CarModel,
  transmission: Transmission,
  fuelType: FuelType,
} 

export interface CarDisplay {
  id: number,
  price: number,
  vinNumber: string,
  date: Date,
  remarks: string,
  model: ModelName,
  brand: BrandName,
  transmission: TransmissionName,
  fuelType: FuelTypeName,
} 

export type CarCreateDto = {
  price: number,
  vinNumber: string,
  date: string,
  remarks: string,
  modelId: number,
  transmissionId: number,
  fuelTypeId: number,
}

export type CarUpdateDto = CarCreateDto;

interface CarModel {
  id: number,
  name: ModelName,
  brand: BrandReturnDto,
}

interface Transmission {id:number, name: TransmissionName}

type TransmissionName = "MANUAL" | 'AUTOMATIC' | 'HYBRID'

interface FuelType {id:number, name: FuelTypeName}

type FuelTypeName = "GAS" | "GASOLINE" | "DIESEL" | "ELECTRIC"