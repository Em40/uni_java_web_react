import { DataGrid, DataGridProps, GridRenderCellParams } from "@mui/x-data-grid"
import React, { useState } from "react"
import { Button } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TransmissionEditModal from "./TransmissionEditModal";
import TransmissionCreateModal from "./TransmissionCreateModal"
import { TransmissionReturnDto } from "../../models/Transmission";

const TransmissionTable = ({rows, onDeleteButtonClick}: TransmissionTableProps) =>{
  const [editModalState, setEditModalState] = useState<boolean>(false)
  const [createModalState, setCreateModalState] = useState<boolean>(false)
  const [transmissionId, setTransmissionId] = useState<number|null> (null)
  
  const onEditButtonClicked = async (id: number) =>{
    setEditModalState(!editModalState)
    setTransmissionId(id)
  }

  return (
  <>      
    <div className='w-full flex justify-end p-2'><Button onClick={()=>{setCreateModalState(true)}}>Add transmission</Button></div>
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
        field: "edit",
        width: 50,
        align: 'center',
        disableColumnMenu: true,
        sortable: false,
        hideSortIcons: true,
        renderHeader: () => {return <></>},
        renderCell: (params: GridRenderCellParams<TransmissionReturnDto>) => {return <Button onClick={() => onEditButtonClicked(params.row.id)}><EditIcon/></Button>}
      },
      {
        field: "delete",
        width: 50,
        align: 'center',
        disableColumnMenu: true,
        sortable: false,
        hideSortIcons: true,
        renderHeader: () => {return <></>},
        renderCell: (params: GridRenderCellParams<TransmissionReturnDto>) => {return <Button onClick={() => onDeleteButtonClick(params.row.id)}><DeleteOutlineIcon/></Button>}
      },
    ]}
    rows={rows}
  />
  <TransmissionEditModal open={editModalState} transmissionId={transmissionId!} handleModalState={setEditModalState} setTransmissionId={setTransmissionId}></TransmissionEditModal>
  <TransmissionCreateModal open={createModalState} handleModalState={setCreateModalState}></TransmissionCreateModal> 
</>)
}

interface TransmissionTableProps extends Omit<DataGridProps, 'columns'> {
  onDeleteButtonClick: (id: number) => void;
}

export default TransmissionTable