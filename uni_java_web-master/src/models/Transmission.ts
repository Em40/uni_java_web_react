export interface TransmissionReturnDto {
  id: number;
  name: TransmissionName;
}

export interface TransmissionCreateDto {
  name: TransmissionName;
}

export enum TransmissionName {
  AUTOMATIC = 'AUTOMATIC',
  MANUAL = 'MANUAL',
  HYBRID = 'HYBRID'
}