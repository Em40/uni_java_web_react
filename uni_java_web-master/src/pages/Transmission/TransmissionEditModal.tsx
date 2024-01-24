import React, {FC, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { transmissionQueryClient } from '../../queries';
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query'
import { TransmissionName, TransmissionReturnDto } from '../../models/Transmission';

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

const TransmissionEditModal: FC<TransmissionEditModalProps> = ({transmissionId, handleModalState, open, setTransmissionId}) => {
  const [name, setName] = useState<TransmissionName | null>(null);

  const handleClose = () => {handleModalState(false); setTransmissionId(null); queryClient.invalidateQueries()};

  const queryClient = useQueryClient()
  const { useTransmissionById, useUpdateTransmission } = transmissionQueryClient;

  const { mutate: transmissionMutate, error } = useUpdateTransmission(
    transmissionId, 
    {name: name as TransmissionName},
    {onSuccess: handleClose});

  useTransmissionById(transmissionId,{enabled: !!transmissionId, onSuccess: (data: TransmissionReturnDto)=>{
    const {name} = data;
    setName(name);
  }});

  

  return (
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
          <Button disabled={!name} onClick={()=>transmissionMutate({id: transmissionId, body: {name: name as TransmissionName}})}>Confirm</Button>
          <Button onClick={()=>handleModalState(!open)}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}

interface TransmissionEditModalProps {
  handleModalState: (open: boolean) => void;
  setTransmissionId: (transmissionId: number | null) => void;
  open: boolean;
  transmissionId: number;
}

export default TransmissionEditModal;