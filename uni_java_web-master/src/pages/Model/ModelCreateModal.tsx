import React, {ChangeEvent, FC, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {  InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query'
import { ModelName } from '../../models/Model';
import { brandQueryClient, modelQueryClient } from '../../queries';

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

const ModelCreateModal: FC<ModelCreateModalProps> = ({handleModalState, open}) => {
  const [name, setName] = useState<ModelName | null>(null);
  const [brandId, setBrandId] = useState<number>(0);

  const { useAllBrands } = brandQueryClient;

  const {data: brands} = useAllBrands();


  const handleClose = () => {
    handleModalState(false); 
    queryClient.invalidateQueries();  
    setName(null)};

  const queryClient = useQueryClient()
  const { useCreateModel } = modelQueryClient;

  const { mutate: modelCreate } = useCreateModel(
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
            <InputLabel>Model</InputLabel>
            <Select
              className='w-full'
              size='small'
              value={name}
              onChange={(e: SelectChangeEvent<ModelName | null>): void => {
                setName(e.target.value === "None" ? null : e.target.value as ModelName)
              }}
            >
              <MenuItem className='h-full' key={'None'} value={"None"}>
                &nbsp;
              </MenuItem>

              {Object.values(ModelName).map((param) => (
                <MenuItem key={param} value={param}>
                  {param}
                </MenuItem>
              ))}
            </Select>
          </div>

            <div>
              <InputLabel>Brand</InputLabel>
              <Select fullWidth size='small' value={brandId} onChange={(event: SelectChangeEvent<number>)=>{setBrandId(Number(event.target.value))}}>
              <MenuItem className='h-full' key={'None'} value={"None"}>
                &nbsp;
              </MenuItem>
                {brands && brands.content.map((model) => (
                  <MenuItem key={model.id} value={model.id}>
                    {model.name}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <Button disabled={!name || !brandId} onClick={()=>modelCreate({name: name as ModelName, brandId: Number(brandId)})}>Confirm</Button>
            <Button onClick={()=>handleModalState(!open)}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  )
}

interface ModelCreateModalProps {
  handleModalState: (open: boolean) => void;
  open: boolean;
}

export default ModelCreateModal;