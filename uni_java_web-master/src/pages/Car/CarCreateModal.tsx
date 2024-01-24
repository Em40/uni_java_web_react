import React, {FC, useState, ChangeEvent} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { carQueryClient, fuelTypeQueryClient, modelQueryClient, transmissionQueryClient } from '../../queries';
import {  InputLabel, MenuItem, Select, SelectChangeEvent, TextField, TextareaAutosize } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CarCreateModal: FC<CarCreateModalProps> = ({handleModalState, open}) => {
  const [price, setPrice] = useState<number>(0);
  const [vinNumber, setVinNumber] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');
  const [modelId, setModelId] = useState<number>(0);
  const [transmissionId, setTransmissionId] = useState<number>(0);
  const [fuelTypeId, setFuelTypeId] = useState<number>(0);

  const { useCreateCar } = carQueryClient;
  const { useAllModels } = modelQueryClient;
  const { useAllTransmissions } = transmissionQueryClient;
  const { useAllFuelTypes } = fuelTypeQueryClient;

  const handleClose = () => {
    handleModalState(false); 
    queryClient.invalidateQueries();  
    setPrice(0); 
    setVinNumber(''); 
    setDate(''); 
    setRemarks(''); 
    setModelId(0); 
    setTransmissionId(0); 
    setFuelTypeId(0)};

  const queryClient = useQueryClient()

  const {data: models} = useAllModels();
  const {data: transmissions} = useAllTransmissions()
  const {data: fuelTypes} = useAllFuelTypes()

  const { mutate: carCreate, error } = useCreateCar(
    {onSuccess: handleClose}
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style} className='space-y-5'>
          <TextField size='small' fullWidth label='Price' type='number' value={price} onChange={(event: ChangeEvent<HTMLInputElement>)=>setPrice(event.target.value ? Number(event.target.value) : 0 )} />
          {error?.response?.data.price && <div className='text-red-500 text-sm'>{error.response.data.price}</div>}
          <TextField size='small' fullWidth label='Vin Number' value={vinNumber} onChange={(event: ChangeEvent<HTMLInputElement>)=>setVinNumber(event.target.value)} />
          {error?.response?.data.vinNumber && <div className='text-red-500 text-sm'>{error.response.data.vinNumber}</div>}
          <TextField size='small' fullWidth type='date' value={date} onChange={(event: ChangeEvent<HTMLInputElement>)=>setDate(event.target.value)} />
          {error?.response?.data.date && <div className='text-red-500 text-sm'>{error.response.data.date}</div>}
          
          <div>
            <InputLabel>Remarks</InputLabel>
            <TextareaAutosize className='w-full border border-gray-300 rounded-md pl-2' maxRows={6} minRows={2} value={remarks} onChange={(event: ChangeEvent<HTMLTextAreaElement>)=>setRemarks(event.target.value)} />
            {error?.response?.data.remarks && <div className='text-red-500 text-sm'>{error.response.data.remarks}</div>}
          </div>

          <div>
              <InputLabel>Model</InputLabel>
              <Select fullWidth size='small' value={modelId} onChange={(event: SelectChangeEvent<number>)=>{setModelId(Number(event.target.value))}}>
                {models && models.content.map((model) => (
                  <MenuItem key={model.id} value={model.id}>
                    {model.name}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div>
              <InputLabel>Transmission</InputLabel>
              <Select fullWidth size='small' value={transmissionId} onChange={(event: SelectChangeEvent<number>)=>{setTransmissionId(Number(event.target.value))}}>
                {transmissions && transmissions.content.map((transmission) => (
                  <MenuItem key={transmission.id} value={transmission.id}>
                    {transmission.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          
            <div>
              <InputLabel>Fuel Type</InputLabel>
              <Select fullWidth size='small' value={fuelTypeId} onChange={(event: SelectChangeEvent<number>)=>{setFuelTypeId(Number(event.target.value))}}>
              {fuelTypes && fuelTypes.content.map((fuelType) => (
                  <MenuItem key={fuelType.id} value={fuelType.id}>
                    {fuelType.name}
                  </MenuItem>
                ))}
              </Select>
            </div>

          {error?.response?.data.errorMessage && <div className='text-red-500 text-sm'>{error.response.data.errorMessage}</div>}
          <Button onClick={()=>carCreate({date,fuelTypeId,modelId,price,remarks,transmissionId,vinNumber})}>Create</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}

interface CarCreateModalProps {
  handleModalState: (open: boolean) => void;
  open: boolean;
}

export default CarCreateModal;