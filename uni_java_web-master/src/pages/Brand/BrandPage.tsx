import React, {} from 'react'
import { Container } from "@mui/material"
import { brandQueryClient } from '../../queries';
import { useQueryClient } from '@tanstack/react-query';
import BrandTable from './BrandTable';


const BrandPage = () => {
  const queryClient = useQueryClient()
  const { useAllBrands, deleteBrand } = brandQueryClient;

  const onDeleteButtonClick = async (id: number) =>{
    await deleteBrand(id);
    queryClient.invalidateQueries([]);
  }

  const { data } = useAllBrands()

  return (
    <Container>
      {data && <BrandTable rows={data.content} onDeleteButtonClick={onDeleteButtonClick}/>}
    </Container>
  );
}

export default BrandPage