import React, {FC, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { brandQueryClient } from '../../queries';
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query'
import { BrandName, BrandReturnDto } from '../../models/Brand';

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

const BrandEditModal: FC<BrandEditModalProps> = ({brandId, handleModalState, open, setBrandId}) => {
  const [name, setName] = useState<BrandName | null>(null);

  const handleClose = () => {handleModalState(false); setBrandId(null); queryClient.invalidateQueries()};

  const queryClient = useQueryClient()
  const { useBrandById, useUpdateBrand } = brandQueryClient;

  const { mutate: brandMutate } = useUpdateBrand(
    brandId, 
    {name: name as BrandName},
    {onSuccess: handleClose});

  useBrandById(brandId,{enabled: !!brandId, onSuccess: (data: BrandReturnDto)=>{
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
            <InputLabel>Brand</InputLabel>
            <Select
              className='w-full'
              size='small'
              value={name}
              onChange={(e: SelectChangeEvent<BrandName | null>): void => {
                setName(e.target.value === "None" ? null : e.target.value as BrandName)
              }}
            >
                <MenuItem className='h-full' key={'None'} value={"None"}>
                  &nbsp;
                </MenuItem>

                {Object.values(BrandName).map((param) => (
                  <MenuItem key={param} value={param}>
                    {param}
                  </MenuItem>
                ))}
            </Select>
          </div>
          <Button disabled={!name} onClick={()=>brandMutate({id: brandId, body: {name: name as BrandName}})}>Confirm</Button>
          <Button onClick={()=>handleModalState(!open)}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}

interface BrandEditModalProps {
  handleModalState: (open: boolean) => void;
  setBrandId: (brandId: number | null) => void;
  open: boolean;
  brandId: number;
}

export default BrandEditModal;