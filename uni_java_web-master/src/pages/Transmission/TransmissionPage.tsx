import React, {} from 'react'
import { Container } from "@mui/material"
import { transmissionQueryClient } from '../../queries';
import { useQueryClient } from '@tanstack/react-query';
import TransmissionTable from './TransmissionTable';


const TransmissionPage = () => {
  const queryClient = useQueryClient()
  const { useAllTransmissions, deleteTransmission } = transmissionQueryClient;

  const onDeleteButtonClick = async (id: number) =>{
    await deleteTransmission(id);
    queryClient.invalidateQueries([]);
  }

  const { data } = useAllTransmissions()

  return (
    <Container>
      {data && <TransmissionTable rows={data.content} onDeleteButtonClick={onDeleteButtonClick}/>}
    </Container>
  );
}

export default TransmissionPage