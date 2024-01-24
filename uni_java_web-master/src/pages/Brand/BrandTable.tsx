import { DataGrid, DataGridProps, GridRenderCellParams } from "@mui/x-data-grid"
import React, { useState } from "react"
import { Button } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BrandEditModal from "./BrandEditModal";
import BrandCreateModal from "./BrandCreateModal"
import { BrandReturnDto } from "../../models/Brand";

const BrandTable = ({rows, onDeleteButtonClick}: BrandTableProps) =>{
  const [editModalState, setEditModalState] = useState<boolean>(false)
  const [createModalState, setCreateModalState] = useState<boolean>(false)
  const [brandId, setBrandId] = useState<number|null> (null)
  
  const onEditButtonClicked = async (id: number) =>{
    setEditModalState(!editModalState)
    setBrandId(id)
  }

  return (
  <>      
    <div className='w-full flex justify-end p-2'><Button onClick={()=>{setCreateModalState(true)}}>Add brand</Button></div>
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
        renderCell: (params: GridRenderCellParams<BrandReturnDto>) => {return <Button onClick={() => onEditButtonClicked(params.row.id)}><EditIcon/></Button>}
      },
      {
        field: "delete",
        width: 50,
        align: 'center',
        disableColumnMenu: true,
        sortable: false,
        hideSortIcons: true,
        renderHeader: () => {return <></>},
        renderCell: (params: GridRenderCellParams<BrandReturnDto>) => {return <Button onClick={() => onDeleteButtonClick(params.row.id)}><DeleteOutlineIcon/></Button>}
      },
    ]}
    rows={rows}
  />
  <BrandEditModal open={editModalState} brandId={brandId!} handleModalState={setEditModalState} setBrandId={setBrandId}></BrandEditModal>
  <BrandCreateModal open={createModalState} handleModalState={setCreateModalState}></BrandCreateModal> 
</>)
}

interface BrandTableProps extends Omit<DataGridProps, 'columns'> {
  onDeleteButtonClick: (id: number) => void;
}

export default BrandTable