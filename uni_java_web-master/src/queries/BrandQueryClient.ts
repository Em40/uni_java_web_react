import {QueryKey, UseMutationOptions, UseQueryOptions, UseQueryResult, useMutation, useQuery} from '@tanstack/react-query'
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { QueryKeys } from './QueryKeys';
import BaseResponse from '../models/BaseResponse';
import { UseMutationResult } from 'react-query';
import { BrandCreateDto, BrandReturnDto } from '../models/Brand';

export type QueryOptions<TData> = UseQueryOptions<TData, AxiosError, TData, QueryKey>;

export type MutationOptions<TData, TProperties> = UseMutationOptions<
  TData,
  AxiosError,
  TProperties,
  unknown
>;

export interface BrandQueryClient {
  createBrand: (body: BrandCreateDto) => Promise<void>
  useCreateBrand: (options?: MutationOptions<void, BrandCreateDto>) => UseMutationResult<void, AxiosError, BrandCreateDto>;  
  allBrands: () => Promise<BaseResponse<BrandReturnDto[]>>;
  useAllBrands: (options?: QueryOptions<BaseResponse<BrandReturnDto[]>>) => UseQueryResult<BaseResponse<BrandReturnDto[]>, AxiosError>;
  brandById: (id: number) => Promise<BrandReturnDto>;
  useBrandById: (id: number, options?: QueryOptions<BrandReturnDto>) => UseQueryResult<BrandReturnDto, AxiosError>;
  deleteBrand: (id: number) => Promise<void>;
  updateBrand: (id: number, body: BrandCreateDto) => Promise<any>;
  useUpdateBrand: (id: number, body: BrandCreateDto, options?: MutationOptions<any, {id: number, body: BrandCreateDto}>) => UseMutationResult<any, AxiosError, {id: number, body: BrandCreateDto}>;
  useDeleteBrand: (id: number, options?: MutationOptions<void, number>) => UseMutationResult<void, AxiosError, number>;
}

export function createBrandQueryClient(axios: AxiosInstance): BrandQueryClient {
  return new BrandQueryClientImp(axios);
}

class BrandQueryClientImp {
  public constructor(private axios: AxiosInstance) {}

  public createBrand = async (body: BrandCreateDto): Promise<void> => {
    return await this.axios
    .post('/api/v1/brands', body)
    .then((response: AxiosResponse<void>) => response.data);
  }

  public useCreateBrand = (options?: MutationOptions<void, BrandCreateDto>
    ): UseMutationResult<void, AxiosError, BrandCreateDto> => {
      return useMutation<void, AxiosError, BrandCreateDto>(
        [QueryKeys.CreateBrand],
        (body: BrandCreateDto) => this.createBrand(body),
        options
      );
    };

  public allBrands = async (
  ): Promise<BaseResponse<BrandReturnDto[]>> => {
    return await this.axios
      .get('/api/v1/brands')
      .then((response: AxiosResponse<BaseResponse<BrandReturnDto[]>>) => response.data);
  };

  public useAllBrands = (
    options?: QueryOptions<BaseResponse<BrandReturnDto[]>>
  ): UseQueryResult<BaseResponse<BrandReturnDto[]>, AxiosError> => {
    return useQuery<BaseResponse<BrandReturnDto[]>, AxiosError>(
      [QueryKeys.GetAllBrands],
      ()=>this.allBrands(),
      options
    );
  };

  public brandById = async ( 
    id: number
    ): Promise<BrandReturnDto> => {
      return await this.axios
        .get(`/api/v1/brands/${id}`)
        .then((response: AxiosResponse<BrandReturnDto>) => response.data);
    };

    public useBrandById = (
      id: number,
      options?: QueryOptions<BrandReturnDto>
    ): UseQueryResult<BrandReturnDto, AxiosError> => {
      return useQuery<BrandReturnDto, AxiosError>(
        [QueryKeys.GetBrandById, id],
        ()=>this.brandById(id),
        options
      );
    };

  public deleteBrand = async (id: number): Promise<void> => {
    return await this.axios
      .delete(`/api/v1/brands/${id}`)
      .then((response: AxiosResponse<void>) => {
        return response.data;
      });
  };

  public useDeleteBrand = (
    id: number,
    options?: MutationOptions<void, number>
  ): UseMutationResult<void, AxiosError, number> => {
    return useMutation<void, AxiosError, number>(
      [QueryKeys.DeleteBrand, id],
      () => this.deleteBrand(id),
      options
    );
  };

  public updateBrand = async (id: number, body: BrandCreateDto): Promise<void> => {
    return await this.axios
      .patch(`/api/v1/brands/${id}`, body)
      .then((response: AxiosResponse<any>) => {
        return response.data;
      })
      .catch((error)=>{
      throw error
    })
  };

  public useUpdateBrand = (
    id: number,
    body: BrandCreateDto,
    options?: MutationOptions<void,  {id: number, body: BrandCreateDto}>
  ): UseMutationResult<void, AxiosError,  {id: number, body: BrandCreateDto}> => {
    return useMutation<void, AxiosError,  {id: number, body: BrandCreateDto}>(
      [QueryKeys.UpdateBrand, id, body],
      () => this.updateBrand(id, body),
      options
    );
  };
}