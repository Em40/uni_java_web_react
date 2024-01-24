import {QueryKey, UseMutationOptions, UseQueryOptions, UseQueryResult, useMutation, useQuery} from '@tanstack/react-query'
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { QueryKeys } from './QueryKeys';
import BaseResponse from '../models/BaseResponse';
import { UseMutationResult } from 'react-query';
import { TransmissionCreateDto, TransmissionReturnDto } from '../models/Transmission';

export type QueryOptions<TData> = UseQueryOptions<TData, AxiosError, TData, QueryKey>;

export type MutationOptions<TData, TProperties> = UseMutationOptions<
  TData,
  AxiosError,
  TProperties,
  unknown
>;

export interface TransmissionQueryClient {
  createTransmission: (body: TransmissionCreateDto) => Promise<void>
  useCreateTransmission: (options?: MutationOptions<void, TransmissionCreateDto>) => UseMutationResult<void, AxiosError, TransmissionCreateDto>;  
  allTransmissions: () => Promise<BaseResponse<TransmissionReturnDto[]>>;
  useAllTransmissions: (options?: QueryOptions<BaseResponse<TransmissionReturnDto[]>>) => UseQueryResult<BaseResponse<TransmissionReturnDto[]>, AxiosError>;
  transmissionById: (id: number) => Promise<TransmissionReturnDto>;
  useTransmissionById: (id: number, options?: QueryOptions<TransmissionReturnDto>) => UseQueryResult<TransmissionReturnDto, AxiosError>;
  deleteTransmission: (id: number) => Promise<void>;
  updateTransmission: (id: number, body: TransmissionCreateDto) => Promise<any>;
  useUpdateTransmission: (id: number, body: TransmissionCreateDto, options?: MutationOptions<any, {id: number, body: TransmissionCreateDto}>) => UseMutationResult<any, AxiosError, {id: number, body: TransmissionCreateDto}>;
  useDeleteTransmission: (id: number, options?: MutationOptions<void, number>) => UseMutationResult<void, AxiosError, number>;
}

export function createTransmissionQueryClient(axios: AxiosInstance): TransmissionQueryClient {
  return new TransmissionQueryClientImp(axios);
}

class TransmissionQueryClientImp {
  public constructor(private axios: AxiosInstance) {}

  public createTransmission = async (body: TransmissionCreateDto): Promise<void> => {
    return await this.axios
    .post('/api/v1/transmissions', body)
    .then((response: AxiosResponse<void>) => response.data);
  }

  public useCreateTransmission = (options?: MutationOptions<void, TransmissionCreateDto>
    ): UseMutationResult<void, AxiosError, TransmissionCreateDto> => {
      return useMutation<void, AxiosError, TransmissionCreateDto>(
        [QueryKeys.CreateTransmission],
        (body: TransmissionCreateDto) => this.createTransmission(body),
        options
      );
    };

  public allTransmissions = async (
  ): Promise<BaseResponse<TransmissionReturnDto[]>> => {
    return await this.axios
      .get('/api/v1/transmissions')
      .then((response: AxiosResponse<BaseResponse<TransmissionReturnDto[]>>) => response.data);
  };

  public useAllTransmissions = (
    options?: QueryOptions<BaseResponse<TransmissionReturnDto[]>>
  ): UseQueryResult<BaseResponse<TransmissionReturnDto[]>, AxiosError> => {
    return useQuery<BaseResponse<TransmissionReturnDto[]>, AxiosError>(
      [QueryKeys.GetAllTransmissions],
      ()=>this.allTransmissions(),
      options
    );
  };

  public transmissionById = async ( 
    id: number
    ): Promise<TransmissionReturnDto> => {
      return await this.axios
        .get(`/api/v1/transmissions/${id}`)
        .then((response: AxiosResponse<TransmissionReturnDto>) => response.data);
    };

    public useTransmissionById = (
      id: number,
      options?: QueryOptions<TransmissionReturnDto>
    ): UseQueryResult<TransmissionReturnDto, AxiosError> => {
      return useQuery<TransmissionReturnDto, AxiosError>(
        [QueryKeys.GetTransmissionById, id],
        ()=>this.transmissionById(id),
        options
      );
    };

  public deleteTransmission = async (id: number): Promise<void> => {
    return await this.axios
      .delete(`/api/v1/transmissions/${id}`)
      .then((response: AxiosResponse<void>) => {
        return response.data;
      });
  };

  public useDeleteTransmission = (
    id: number,
    options?: MutationOptions<void, number>
  ): UseMutationResult<void, AxiosError, number> => {
    return useMutation<void, AxiosError, number>(
      [QueryKeys.DeleteTransmission, id],
      () => this.deleteTransmission(id),
      options
    );
  };

  public updateTransmission = async (id: number, body: TransmissionCreateDto): Promise<void> => {
    return await this.axios
      .patch(`/api/v1/transmissions/${id}`, body)
      .then((response: AxiosResponse<any>) => {
        return response.data;
      })
      .catch((error)=>{
      throw error
    })
  };

  public useUpdateTransmission = (
    id: number,
    body: TransmissionCreateDto,
    options?: MutationOptions<void,  {id: number, body: TransmissionCreateDto}>
  ): UseMutationResult<void, AxiosError,  {id: number, body: TransmissionCreateDto}> => {
    return useMutation<void, AxiosError,  {id: number, body: TransmissionCreateDto}>(
      [QueryKeys.UpdateTransmission, id, body],
      () => this.updateTransmission(id, body),
      options
    );
  };
}