import { DataGrid, DataGridProps, GridRenderCellParams } from "@mui/x-data-grid"
import React, { useState } from "react"
import { Button } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FuelTypeEditModal from "./FuelTypeEditModal";
import FuelTypeCreateModal from "./FuelTypeCreateModal"
import { FuelTypeReturnDto } from "../../models/FuelType";

const FuelTypeTable = ({rows, onDeleteButtonClick}: FuelTypeTableProps) =>{
  const [editModalState, setEditModalState] = useState<boolean>(false)
  const [createModalState, setCreateModalState] = useState<boolean>(false)
  const [fuelTypeId, setFuelTypeId] = useState<number|null> (null)
  
  const onEditButtonClicked = async (id: number) =>{
    setEditModalState(!editModalState)
    setFuelTypeId(id)
  }

  return (
  <>      
    <div className='w-full flex justify-end p-2'><Button onClick={()=>{setCreateModalState(true)}}>Add fuel type</Button></div>
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
        renderCell: (params: GridRenderCellParams<FuelTypeReturnDto>) => {return <Button onClick={() => onEditButtonClicked(params.row.id)}><EditIcon/></Button>}
      },
      {
        field: "delete",
        width: 50,
        align: 'center',
        disableColumnMenu: true,
        sortable: false,
        hideSortIcons: true,
        renderHeader: () => {return <></>},
        renderCell: (params: GridRenderCellParams<FuelTypeReturnDto>) => {return <Button onClick={() => onDeleteButtonClick(params.row.id)}><DeleteOutlineIcon/></Button>}
      },
    ]}
    rows={rows}
  />
  <FuelTypeEditModal open={editModalState} fuelTypeId={fuelTypeId!} handleModalState={setEditModalState} setFuelTypeId={setFuelTypeId}></FuelTypeEditModal>
  <FuelTypeCreateModal open={createModalState} handleModalState={setCreateModalState}></FuelTypeCreateModal> 
</>)
}

interface FuelTypeTableProps extends Omit<DataGridProps, 'columns'> {
  onDeleteButtonClick: (id: number) => void;
}

export default FuelTypeTable