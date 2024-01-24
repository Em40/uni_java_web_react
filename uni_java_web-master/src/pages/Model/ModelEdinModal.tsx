import React, {FC, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { brandQueryClient, modelQueryClient } from '../../queries';
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query'
import { ModelName, ModelReturnDto } from '../../models/Model';

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

const ModelEditModal: FC<ModelEditModalProps> = ({modelId, handleModalState, open, setModelId}) => {
  const [name, setName] = useState<ModelName | null>(null);
  const [brandId, setBrandId] = useState<number>(0);

  const handleClose = () => {handleModalState(false); setModelId(null); queryClient.invalidateQueries()};

  const queryClient = useQueryClient()

  const { useModelById, useUpdateModel } = modelQueryClient;
  const { useAllBrands } = brandQueryClient;

  const {data: brands} = useAllBrands();

  const { mutate: modelMutate, error } = useUpdateModel(
    modelId, 
    {name: name as ModelName, brandId: brandId!},
    {onSuccess: handleClose});

  useModelById(modelId,{enabled: !!modelId, onSuccess: (data: ModelReturnDto)=>{
    const {name, brand} = data;
    setName(name);
    setBrandId(brand.id)
  }});

  

  return (
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

          <Button disabled={!name || !brandId} onClick={()=>modelMutate({id: modelId, body: {name: name as ModelName, brandId: brandId!}})}>Confirm</Button>
          <Button onClick={()=>handleModalState(!open)}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}

interface ModelEditModalProps {
  handleModalState: (open: boolean) => void;
  setModelId: (modelId: number | null) => void;
  open: boolean;
  modelId: number;
}

export default ModelEditModal;