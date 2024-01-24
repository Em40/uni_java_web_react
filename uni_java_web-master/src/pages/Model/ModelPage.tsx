import React, { useState } from 'react'
import { Container } from "@mui/material"
import { modelQueryClient } from '../../queries';
import { useQueryClient } from '@tanstack/react-query';
import ModelTable from './ModelTable';
import BaseResponse from '../../models/BaseResponse';
import { ModelDisplay, ModelReturnDto } from '../../models/Model';


const ModelPage = () => {
  const [models, setModels] = useState<ModelDisplay[]>([])
  const queryClient = useQueryClient()
  const { useAllModels, deleteModel } = modelQueryClient;

  const onDeleteButtonClick = async (id: number) =>{
    await deleteModel(id);
    queryClient.invalidateQueries([]);
  }

  const { data } = useAllModels(
    {onSuccess: (data: BaseResponse<ModelReturnDto[]>) =>{
      const models: ModelDisplay[] = data.content.map((model: ModelReturnDto)=> {return {
        id: model.id,
        name: model.name,
        brandId: model.brand.id,
        brandName: model.brand.name,
      }})
      setModels(models)
    }}
  )

  return (
    <Container>
      {data && <ModelTable rows={models} onDeleteButtonClick={onDeleteButtonClick}/>}
    </Container>
  );
}

export default ModelPage