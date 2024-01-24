import { DataGrid, DataGridProps, GridRenderCellParams } from "@mui/x-data-grid"
import React, { useState } from "react"
import { Button } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import ModelCreateModal from "./ModelCreateModal"
import { ModelReturnDto } from "../../models/Model";
import ModelEditModal from "./ModelEdinModal";

const ModelTable = ({rows, onDeleteButtonClick}: ModelTableProps) =>{
  const [editModalState, setEditModalState] = useState<boolean>(false)
  const [createModalState, setCreateModalState] = useState<boolean>(false)
  const [modelId, setModelId] = useState<number|null> (null)
  
  const onEditButtonClicked = async (id: number) =>{
    setEditModalState(!editModalState)
    setModelId(id)
  }

  return (
  <>      
    <div className='w-full flex justify-end p-2'><Button onClick={()=>{setCreateModalState(true)}}>Add Model</Button></div>
    <DataGrid
    className='min-h-[400px] h-fit'
    initialState={{
      pagination: { paginationModel: { pageSize: 5 } },
    }}
    pageSizeOptions={[5, 10, 25]}
    columns={[
      {field: 'id'},
      {
        field: 'name',
        flex: 1,
      },
      {
        field: 'brandName',
        headerName: 'brand name',
        flex: 1,
      },
      {
        field: "edit",
        width: 50,
        align: 'center',
        disableColumnMenu: true,
        sortable: false,
        hideSortIcons: true,
        renderHeader: () => {return <></>},
        renderCell: (params: GridRenderCellParams<ModelReturnDto>) => {return <Button onClick={() => onEditButtonClicked(params.row.id)}><EditIcon/></Button>}
      },
      {
        field: "delete",
        width: 50,
        align: 'center',
        disableColumnMenu: true,
        sortable: false,
        hideSortIcons: true,
        renderHeader: () => {return <></>},
        renderCell: (params: GridRenderCellParams<ModelReturnDto>) => {return <Button onClick={() => onDeleteButtonClick(params.row.id)}><DeleteOutlineIcon/></Button>}
      },
    ]}
    rows={rows}
  />
  <ModelEditModal open={editModalState} modelId={modelId!} handleModalState={setEditModalState} setModelId={setModelId}></ModelEditModal>
  <ModelCreateModal open={createModalState} handleModalState={setCreateModalState}></ModelCreateModal> 
</>)
}

interface ModelTableProps extends Omit<DataGridProps, 'columns'> {
  onDeleteButtonClick: (id: number) => void;
}

export default ModelTable