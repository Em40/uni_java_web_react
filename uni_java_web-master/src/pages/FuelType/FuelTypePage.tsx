import React, {} from 'react'
import { Container } from "@mui/material"
import { fuelTypeQueryClient } from '../../queries';
import { useQueryClient } from '@tanstack/react-query';
import FuelTypeTable from './FuelTypeTable';


const FuelTypePage = () => {
  const queryClient = useQueryClient()
  const { useAllFuelTypes, deleteFuelType } = fuelTypeQueryClient;

  const onDeleteButtonClick = async (id: number) =>{
    await deleteFuelType(id);
    queryClient.invalidateQueries([]);
  }

  const { data } = useAllFuelTypes()

  return (
    <Container>
      {data && <FuelTypeTable rows={data.content} onDeleteButtonClick={onDeleteButtonClick}/>}
    </Container>
  );
}

export default FuelTypePage