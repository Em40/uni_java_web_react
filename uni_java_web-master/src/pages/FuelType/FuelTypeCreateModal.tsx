import React, {FC, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { fuelTypeQueryClient } from '../../queries';
import {  InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query'
import { FuelTypeName } from '../../models/FuelType';

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

const FuelTypeCreateModal: FC<FuelTypeCreateModalProps> = ({handleModalState, open}) => {
  const [name, setName] = useState<FuelTypeName | null>(null);

  const handleClose = () => {
    handleModalState(false); 
    queryClient.invalidateQueries();  
    setName(null)};

  const queryClient = useQueryClient()
  const { useCreateFuelType } = fuelTypeQueryClient;

  const { mutate: fuelTypeCreate, error } = useCreateFuelType(
    {onSuccess: handleClose}
  );

  return(
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style} className='space-y-6'>
          <div>
            <InputLabel>Fuel type</InputLabel>
            <Select
              className='w-full'
              size='small'
              value={name}
              onChange={(e: SelectChangeEvent<FuelTypeName | null>): void => {
                setName(e.target.value === "None" ? null : e.target.value as FuelTypeName)
              }}
            >
              <MenuItem className='h-full' key={'None'} value={"None"}>
                &nbsp;
              </MenuItem>

              {Object.values(FuelTypeName).map((param) => (
                <MenuItem key={param} value={param}>
                  {param}
                </MenuItem>
              ))}
            </Select>
          </div> 

            <Button disabled={!name} onClick={()=>fuelTypeCreate({name: name as FuelTypeName})}>Confirm</Button>
            <Button onClick={()=>handleModalState(!open)}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  )
}

interface FuelTypeCreateModalProps {
  handleModalState: (open: boolean) => void;
  open: boolean;
}

export default FuelTypeCreateModal;