import Car, { CarCreateDto, CarUpdateDto } from '../models/Car';
import {QueryKey, UseMutationOptions, UseQueryOptions, UseQueryResult, useMutation, useQuery} from '@tanstack/react-query'
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { QueryKeys } from './QueryKeys';
import BaseResponse from '../models/BaseResponse';
import { UseMutationResult } from 'react-query';

export type QueryOptions<TData> = UseQueryOptions<TData, AxiosError, TData, QueryKey>;

export type MutationOptions<TData, TProperties> = UseMutationOptions<
  TData,
  AxiosError,
  TProperties,
  unknown
>;

export interface CarQueryClient {
  createCar: (car: CarCreateDto) => Promise<void>
  useCreateCar: (options?: MutationOptions<void, CarCreateDto>) => UseMutationResult<void, AxiosError<UpdateCarErrorResponse>, CarCreateDto>;  
  getAllCars: () => Promise<BaseResponse<Car[]>>;
  getCarById: (id: number) => Promise<Car>;
  useCarById: (id: number, options?: QueryOptions<Car>) => UseQueryResult<Car, AxiosError>;
  searchCars: (params: SearchParams)=> Promise<Car[] | void>;
  useSearchCars: (params: SearchParams, options?: QueryOptions<Car[] | void>) => UseQueryResult<Car[] | void, AxiosError>
  deleteCar: (id: number) => Promise<void>;
  updateCar: (id: number, car: CarUpdateDto) => Promise<any>;
  useUpdateCar: (id: number, car: CarUpdateDto, options?: MutationOptions<any, {id: number, car: CarUpdateDto}>) => UseMutationResult<any, AxiosError<UpdateCarErrorResponse>, {id: number, car: CarUpdateDto}>;
  useAllCars: (options?: QueryOptions<BaseResponse<Car[]>>) => UseQueryResult<BaseResponse<Car[]>, AxiosError>;
  useDeleteCar: (id: number, options?: MutationOptions<void, number>) => UseMutationResult<void, AxiosError, number>;
}

export function createCarQueryClient(axios: AxiosInstance): CarQueryClient {
  return new CarQueryClientImp(axios);
}

class CarQueryClientImp {
  public constructor(private axios: AxiosInstance) {}

  public createCar = async (car: CarCreateDto): Promise<void> => {
    return await this.axios
    .post('/api/v1/cars', car)
    .then((response: AxiosResponse<void>) => response.data);
  }

  public useCreateCar = (options?: MutationOptions<void, CarCreateDto>
    ): UseMutationResult<void, AxiosError<UpdateCarErrorResponse>, CarCreateDto> => {
      return useMutation<void, AxiosError<UpdateCarErrorResponse>, CarCreateDto>(
        [QueryKeys.CreateCar],
        (car: CarCreateDto) => this.createCar(car),
        options
      );
    };

  public getAllCars = async (
  ): Promise<BaseResponse<Car[]>> => {
    return await this.axios
      .get('/api/v1/cars')
      .then((response: AxiosResponse<BaseResponse<Car[]>>) => response.data);
  };

  public getCarById = async ( 
    id: number
    ): Promise<Car> => {
      return await this.axios
        .get(`/api/v1/cars/${id}`)
        .then((response: AxiosResponse<Car>) => response.data);
    };

    public useCarById = (
      id: number,
      options?: QueryOptions<Car>
    ): UseQueryResult<Car, AxiosError> => {
      return useQuery<Car, AxiosError>(
        [QueryKeys.GetCarById, id],
        ()=>this.getCarById(id),
        options
      );
    };

  public searchCars = async (
    params: SearchParams
    ): Promise<Car[] | void> => {
      return await this.axios
        .get('/api/v1/cars/search',{params: params})
        .then((response: AxiosResponse<Car[]>) => response.data)
        .catch((error: AxiosError)=>console.log(error.message))
        ;
    };

    public useSearchCars = (
      params: SearchParams,
      options?: QueryOptions<Car[] | void>
    ): UseQueryResult<Car[] | void, AxiosError> => {
      return useQuery<Car[] | void, AxiosError>(
        [QueryKeys.SearchCars],
        ()=>this.searchCars(params),
        options
      );
    };

  public useAllCars = (
    options?: QueryOptions<BaseResponse<Car[]>>
  ): UseQueryResult<BaseResponse<Car[]>, AxiosError> => {
    return useQuery<BaseResponse<Car[]>, AxiosError>(
      [QueryKeys.GetAllCars],
      ()=>this.getAllCars(),
      options
    );
  };

  public deleteCar = async (id: number): Promise<void> => {
    return await this.axios
      .delete(`/api/v1/cars/${id}`)
      .then((response: AxiosResponse<void>) => {
        return response.data;
      });
  };

  public useDeleteCar = (
    id: number,
    options?: MutationOptions<void, number>
  ): UseMutationResult<void, AxiosError, number> => {
    return useMutation<void, AxiosError, number>(
      [QueryKeys.DeleteCar, id],
      () => this.deleteCar(id),
      options
    );
  };

  public updateCar = async (id: number, car: CarUpdateDto): Promise<void> => {
    return await this.axios
      .patch(`/api/v1/cars/${id}`, car)
      .then((response: AxiosResponse<any>) => {
        return response.data;
      })
      .catch((error)=>{
      throw error
    })
  };

  public useUpdateCar = (
    id: number,
    car: CarUpdateDto,
    options?: MutationOptions<void,  {id: number, car: CarUpdateDto}>
  ): UseMutationResult<void, AxiosError<UpdateCarErrorResponse>,  {id: number, car: CarUpdateDto}> => {
    return useMutation<void, AxiosError<UpdateCarErrorResponse>,  {id: number, car: CarUpdateDto}>(
      [QueryKeys.UpdateCar, id, car],
      () => this.updateCar(id, car),
      options
    );
  };
}

interface SearchParams {
  price?: number;
  regDate?: string;
  brand?: string;
  model?: string;
  transmission?: string;
  fueldType?: string;
}

interface UpdateCarErrorResponse {
  price?: string;
  remarks?: string;
  vinNumber?: string;
  date?: string;
  errorMessage?: string;
}