import {QueryKey, UseMutationOptions, UseQueryOptions, UseQueryResult, useMutation, useQuery} from '@tanstack/react-query'
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { QueryKeys } from './QueryKeys';
import BaseResponse from '../models/BaseResponse';
import { UseMutationResult } from 'react-query';
import {  ModelCreateDto, ModelReturnDto } from '../models/Model';

export type QueryOptions<TData> = UseQueryOptions<TData, AxiosError, TData, QueryKey>;

export type MutationOptions<TData, TProperties> = UseMutationOptions<
  TData,
  AxiosError,
  TProperties,
  unknown
>;

export interface ModelQueryClient {
  createModel: (body: ModelCreateDto) => Promise<void>
  useCreateModel: (options?: MutationOptions<void, ModelCreateDto>) => UseMutationResult<void, AxiosError, ModelCreateDto>;  
  allModels: () => Promise<BaseResponse<ModelReturnDto[]>>;
  useAllModels: (options?: QueryOptions<BaseResponse<ModelReturnDto[]>>) => UseQueryResult<BaseResponse<ModelReturnDto[]>, AxiosError>;
  modelById: (id: number) => Promise<ModelReturnDto>;
  useModelById: (id: number, options?: QueryOptions<ModelReturnDto>) => UseQueryResult<ModelReturnDto, AxiosError>;
  deleteModel: (id: number) => Promise<void>;
  updateModel: (id: number, body: ModelCreateDto) => Promise<any>;
  useUpdateModel: (id: number, body: ModelCreateDto, options?: MutationOptions<any, {id: number, body: ModelCreateDto}>) => UseMutationResult<any, AxiosError, {id: number, body: ModelCreateDto}>;
  useDeleteModel: (id: number, options?: MutationOptions<void, number>) => UseMutationResult<void, AxiosError, number>;
}

export function createModelQueryClient(axios: AxiosInstance): ModelQueryClient {
  return new ModelQueryClientImp(axios);
}

class ModelQueryClientImp {
  public constructor(private axios: AxiosInstance) {}

  public createModel = async (body: ModelCreateDto): Promise<void> => {
    return await this.axios
    .post('/api/v1/models', body)
    .then((response: AxiosResponse<void>) => response.data);
  }

  public useCreateModel = (options?: MutationOptions<void, ModelCreateDto>
    ): UseMutationResult<void, AxiosError, ModelCreateDto> => {
      return useMutation<void, AxiosError, ModelCreateDto>(
        [QueryKeys.CreateModel],
        (body: ModelCreateDto) => this.createModel(body),
        options
      );
    };

  public allModels = async (
  ): Promise<BaseResponse<ModelReturnDto[]>> => {
    return await this.axios
      .get('/api/v1/models')
      .then((response: AxiosResponse<BaseResponse<ModelReturnDto[]>>) => response.data);
  };

  public useAllModels = (
    options?: QueryOptions<BaseResponse<ModelReturnDto[]>>
  ): UseQueryResult<BaseResponse<ModelReturnDto[]>, AxiosError> => {
    return useQuery<BaseResponse<ModelReturnDto[]>, AxiosError>(
      [QueryKeys.GetAllModels],
      ()=>this.allModels(),
      options
    );
  };

  public modelById = async ( 
    id: number
    ): Promise<ModelReturnDto> => {
      return await this.axios
        .get(`/api/v1/models/${id}`)
        .then((response: AxiosResponse<ModelReturnDto>) => response.data);
    };

    public useModelById = (
      id: number,
      options?: QueryOptions<ModelReturnDto>
    ): UseQueryResult<ModelReturnDto, AxiosError> => {
      return useQuery<ModelReturnDto, AxiosError>(
        [QueryKeys.GetModelById, id],
        ()=>this.modelById(id),
        options
      );
    };

  public deleteModel = async (id: number): Promise<void> => {
    return await this.axios
      .delete(`/api/v1/models/${id}`)
      .then((response: AxiosResponse<void>) => {
        return response.data;
      });
  };

  public useDeleteModel = (
    id: number,
    options?: MutationOptions<void, number>
  ): UseMutationResult<void, AxiosError, number> => {
    return useMutation<void, AxiosError, number>(
      [QueryKeys.DeleteModel, id],
      () => this.deleteModel(id),
      options
    );
  };

  public updateModel = async (id: number, body: ModelCreateDto): Promise<void> => {
    return await this.axios
      .patch(`/api/v1/models/${id}`, body)
      .then((response: AxiosResponse<any>) => {
        return response.data;
      })
      .catch((error)=>{
      throw error
    })
  };

  public useUpdateModel = (
    id: number,
    body: ModelCreateDto,
    options?: MutationOptions<void,  {id: number, body: ModelCreateDto}>
  ): UseMutationResult<void, AxiosError,  {id: number, body: ModelCreateDto}> => {
    return useMutation<void, AxiosError,  {id: number, body: ModelCreateDto}>(
      [QueryKeys.UpdateModel, id, body],
      () => this.updateModel(id, body),
      options
    );
  };
}

const pageable = {
  sort: {
    empty: true,
    sorted: true,
    unsorted: false
  },
  offset: 0,
  pageNumber: 0,
  pageSize: 20,
  paged: true,
  unpaged: false
};