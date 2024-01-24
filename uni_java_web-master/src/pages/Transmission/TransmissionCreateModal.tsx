import React, {FC, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { transmissionQueryClient } from '../../queries';
import {  InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query'
import { TransmissionName } from '../../models/Transmission';

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

const TransmissionCreateModal: FC<TransmissionCreateModalProps> = ({handleModalState, open}) => {
  const [name, setName] = useState<TransmissionName | null>(null);

  const handleClose = () => {
    handleModalState(false); 
    queryClient.invalidateQueries();  
    setName(null)};

  const queryClient = useQueryClient()
  const { useCreateTransmission } = transmissionQueryClient;

  const { mutate: transmissionCreate, error } = useCreateTransmission(
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
            <InputLabel>Transmissions</InputLabel>
            <Select
              className='w-full'
              size='small'
              value={name}
              onChange={(e: SelectChangeEvent<TransmissionName | null>): void => {
                setName(e.target.value === "None" ? null : e.target.value as TransmissionName)
              }}
            >
              <MenuItem className='h-full' key={'None'} value={"None"}>
                &nbsp;
              </MenuItem>

              {Object.values(TransmissionName).map((param) => (
                <MenuItem key={param} value={param}>
                  {param}
                </MenuItem>
              ))}
            </Select>
          </div>

            <Button disabled={!name} onClick={()=>transmissionCreate({name: name as TransmissionName})}>Confirm</Button>
            <Button onClick={()=>handleModalState(!open)}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  )
}

interface TransmissionCreateModalProps {
  handleModalState: (open: boolean) => void;
  open: boolean;
}

export default TransmissionCreateModal;