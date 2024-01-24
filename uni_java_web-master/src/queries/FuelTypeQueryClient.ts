import {QueryKey, UseMutationOptions, UseQueryOptions, UseQueryResult, useMutation, useQuery} from '@tanstack/react-query'
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { QueryKeys } from './QueryKeys';
import BaseResponse from '../models/BaseResponse';
import { UseMutationResult } from 'react-query';
import {  FuelTypeCreateDto, FuelTypeReturnDto } from '../models/FuelType';

export type QueryOptions<TData> = UseQueryOptions<TData, AxiosError, TData, QueryKey>;

export type MutationOptions<TData, TProperties> = UseMutationOptions<
  TData,
  AxiosError,
  TProperties,
  unknown
>;

export interface FuelTypeQueryClient {
  createFuelType: (body: FuelTypeCreateDto) => Promise<void>
  useCreateFuelType: (options?: MutationOptions<void, FuelTypeCreateDto>) => UseMutationResult<void, AxiosError, FuelTypeCreateDto>;  
  allFuelTypes: () => Promise<BaseResponse<FuelTypeReturnDto[]>>;
  useAllFuelTypes: (options?: QueryOptions<BaseResponse<FuelTypeReturnDto[]>>) => UseQueryResult<BaseResponse<FuelTypeReturnDto[]>, AxiosError>;
  fuelTypeById: (id: number) => Promise<FuelTypeReturnDto>;
  useFuelTypeById: (id: number, options?: QueryOptions<FuelTypeReturnDto>) => UseQueryResult<FuelTypeReturnDto, AxiosError>;
  deleteFuelType: (id: number) => Promise<void>;
  updateFuelType: (id: number, body: FuelTypeCreateDto) => Promise<any>;
  useUpdateFuelType: (id: number, body: FuelTypeCreateDto, options?: MutationOptions<any, {id: number, body: FuelTypeCreateDto}>) => UseMutationResult<any, AxiosError, {id: number, body: FuelTypeCreateDto}>;
  useDeleteFuelType: (id: number, options?: MutationOptions<void, number>) => UseMutationResult<void, AxiosError, number>;
}

export function createFuelTypeQueryClient(axios: AxiosInstance): FuelTypeQueryClient {
  return new FuelTypeQueryClientImp(axios);
}

class FuelTypeQueryClientImp {
  public constructor(private axios: AxiosInstance) {}

  public createFuelType = async (body: FuelTypeCreateDto): Promise<void> => {
    return await this.axios
    .post('/api/v1/fuel-types', body)
    .then((response: AxiosResponse<void>) => response.data);
  }

  public useCreateFuelType = (options?: MutationOptions<void, FuelTypeCreateDto>
    ): UseMutationResult<void, AxiosError, FuelTypeCreateDto> => {
      return useMutation<void, AxiosError, FuelTypeCreateDto>(
        [QueryKeys.CreateFuelType],
        (body: FuelTypeCreateDto) => this.createFuelType(body),
        options
      );
    };

  public allFuelTypes = async (
  ): Promise<BaseResponse<FuelTypeReturnDto[]>> => {
    return await this.axios
      .get('/api/v1/fuel-types')
      .then((response: AxiosResponse<BaseResponse<FuelTypeReturnDto[]>>) => response.data);
  };

  public useAllFuelTypes = (
    options?: QueryOptions<BaseResponse<FuelTypeReturnDto[]>>
  ): UseQueryResult<BaseResponse<FuelTypeReturnDto[]>, AxiosError> => {
    return useQuery<BaseResponse<FuelTypeReturnDto[]>, AxiosError>(
      [QueryKeys.GetAllFuelTypes],
      ()=>this.allFuelTypes(),
      options
    );
  };

  public fuelTypeById = async ( 
    id: number
    ): Promise<FuelTypeReturnDto> => {
      return await this.axios
        .get(`/api/v1/fuel-types/${id}`)
        .then((response: AxiosResponse<FuelTypeReturnDto>) => response.data);
    };

    public useFuelTypeById = (
      id: number,
      options?: QueryOptions<FuelTypeReturnDto>
    ): UseQueryResult<FuelTypeReturnDto, AxiosError> => {
      return useQuery<FuelTypeReturnDto, AxiosError>(
        [QueryKeys.GetFuelTypeById, id],
        ()=>this.fuelTypeById(id),
        options
      );
    };

  public deleteFuelType = async (id: number): Promise<void> => {
    return await this.axios
      .delete(`/api/v1/fuel-types/${id}`)
      .then((response: AxiosResponse<void>) => {
        return response.data;
      });
  };

  public useDeleteFuelType = (
    id: number,
    options?: MutationOptions<void, number>
  ): UseMutationResult<void, AxiosError, number> => {
    return useMutation<void, AxiosError, number>(
      [QueryKeys.DeleteFuelType, id],
      () => this.deleteFuelType(id),
      options
    );
  };

  public updateFuelType = async (id: number, body: FuelTypeCreateDto): Promise<void> => {
    return await this.axios
      .patch(`/api/v1/fuel-types/${id}`, body)
      .then((response: AxiosResponse<any>) => {
        return response.data;
      })
      .catch((error)=>{
      throw error
    })
  };

  public useUpdateFuelType = (
    id: number,
    body: FuelTypeCreateDto,
    options?: MutationOptions<void,  {id: number, body: FuelTypeCreateDto}>
  ): UseMutationResult<void, AxiosError,  {id: number, body: FuelTypeCreateDto}> => {
    return useMutation<void, AxiosError,  {id: number, body: FuelTypeCreateDto}>(
      [QueryKeys.UpdateFuelType, id, body],
      () => this.updateFuelType(id, body),
      options
    );
  };
}