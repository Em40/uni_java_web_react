import { DataGrid, DataGridProps, GridRenderCellParams } from "@mui/x-data-grid"
import React, { useState } from "react"
import { CarDisplay } from "../../models/Car"
import { Button } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BasicModal from "./CarEditModal";
import CarCreateModal from "./CarCreateModal";

const CarTable = ({rows, onDeleteButtonClick}: CarTableProps) =>{
  const [editModalState, setEditModalState] = useState<boolean>(false)
  const [createModalState, setCreateModalState] = useState<boolean>(false)
  const [carId, setCarId] = useState<number|null> (null)
  
  const onEditButtonClicked = async (id: number) =>{
    setEditModalState(!editModalState)
    setCarId(id)
  }

  return (
  <>      
    <div className='w-full flex justify-end p-2'><Button onClick={()=>{setCreateModalState(true)}}>Add car</Button></div>
    <DataGrid
    className='min-h-[400px] h-fit'
    initialState={{
      pagination: { paginationModel: { pageSize: 5 } },
    }}
    pageSizeOptions={[5, 10, 25]}
    columns={[
      {
        field: 'brand',
        headerName: 'Brand',
        type: 'string',
        headerAlign: 'left',
        align: 'left',
        minWidth: 100,
        flex: 0.55,
      },
      {
        field: 'model',
        headerName: 'Model',
        type: 'string',
        headerAlign: 'left',
        align: 'left',
        minWidth: 50,
        flex: 0.55,
      },
      {
        field: 'vinNumber',
        headerName: 'Vin Number',
        type: 'string',
        headerAlign: 'left',
        align: 'left',
        minWidth: 100,
        flex: 0.75,
      },
      {
        field: 'date',
        headerName: 'Date',
        type: 'string',
        headerAlign: 'left',
        align: 'left',
        minWidth: 100,
        flex: 0.75,
      },
      {
        field: 'transmission',
        headerName: 'Transmission',
        type: 'string',
        headerAlign: 'left',
        align: 'left',
        minWidth: 100,
        flex: 0.75,
      },
      {
        field: 'fuelType',
        headerName: 'Fuel Type',
        type: 'string',
        headerAlign: 'left',
        align: 'left',
        minWidth: 100,
        flex: 0.75,
      },
      {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        headerAlign: 'left',
        align: 'left',
        minWidth: 100,
        flex: 0.75,
        renderCell: (params: GridRenderCellParams<CarDisplay>) => {return <span>{`${params.row.price}$`}</span>}
      },
      {
        field: "edit",
        minWidth: 50,
        flex: 0.25,
        align: 'center',
        disableColumnMenu: true,
        sortable: false,
        hideSortIcons: true,
        renderHeader: () => {return <></>},
        renderCell: (params: GridRenderCellParams<CarDisplay>) => {return <Button onClick={() => onEditButtonClicked(params.row.id)}><EditIcon/></Button>}
      },
      {
        field: "delete",
        minWidth: 50,
        flex: 0.25,
        align: 'center',
        disableColumnMenu: true,
        sortable: false,
        hideSortIcons: true,
        renderHeader: () => {return <></>},
        renderCell: (params: GridRenderCellParams<CarDisplay>) => {return <Button onClick={() => onDeleteButtonClick(params.row.id)}><DeleteOutlineIcon/></Button>}
      },
    ]}
    rows={rows}
  />
  <BasicModal open={editModalState} carId={carId!} handleModalState={setEditModalState} setCarId={setCarId}></BasicModal>
  <CarCreateModal open={createModalState} handleModalState={setCreateModalState}></CarCreateModal>
</>)
}

interface CarTableProps extends Omit<DataGridProps, 'columns'> {
  onDeleteButtonClick: (id: number) => void;
}

export default CarTable