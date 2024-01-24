import React, {useState, useEffect} from 'react'
import { Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import Car, { CarDisplay } from '../../models/Car';
import { carQueryClient } from '../../queries';
import BaseResponse from '../../models/BaseResponse';
import { useQueryClient } from '@tanstack/react-query';
import CarTable from './CarTable';


const CarPage = () => {
  const searchParams: SearchParam[] = ['price', 'brand', 'model', 'transmission', 'fuelType']

  const [cars, setCars] = useState<CarDisplay[]>([])
  const [searchParam, setSearchParam] = useState<SearchParam>('model')
  const [searchValue, setSearchValue] = useState<string>('')

  const queryClient = useQueryClient()
  const { useAllCars, useSearchCars, deleteCar } = carQueryClient;


  useAllCars({
    enabled: !searchValue,
    onSuccess: (data: BaseResponse<Car[]>)=>
  {
      let carsArr: CarDisplay[] = []
      data.content.map((car) => {
        const carEntry : CarDisplay = 
        {
          id: car.id, 
          brand: car.model.brand.name, 
          date: car.date as Date, 
          fuelType: car.fuelType.name, 
          model: car.model.name, 
          price: car.price, 
          remarks: car.remarks, 
          transmission: car.transmission.name, 
          vinNumber: car.vinNumber
        }
        carsArr.push(carEntry)
      })
      setCars(carsArr)
    }});

    const {refetch: refetchSearch} = useSearchCars({[searchParam]: searchValue},{
      enabled: false,
      onSuccess: (data: Car[] | void)=>{
        let carsArr: CarDisplay[] = []

        data && data.map((car) => {
          const carEntry : CarDisplay = 
          {
            id: car.id, 
            brand: car.model.brand.name, 
            date: car.date as Date, 
            fuelType: car.fuelType.name, 
            model: car.model.name, 
            price: car.price, 
            remarks: car.remarks, 
            transmission: car.transmission.name, 
            vinNumber: car.vinNumber
          }
          
          carsArr.push(carEntry)
        })
        setCars(carsArr)
      },
      onError: () => {setCars([])}

    });

  useEffect(()=>{
    setSearchValue('')
  },[searchParam])

  useEffect(()=>{
    searchValue && refetchSearch()
  },[searchValue, refetchSearch])


const onDeleteButtonClick = async (id: number) =>{
  await deleteCar(id);
  queryClient.invalidateQueries([]);
}

  return (
    <Container>
      <div className='flex justify-center space-x-2 mb-4 h-fit'>
        <FormControl className=''>
          <InputLabel id="demo-simple-select-label">Search by</InputLabel>
          <Select
            className='w-[200px]'
            size='small'
            value={searchParam}
            label="Search by"
            onChange={(e: SelectChangeEvent<SearchParam>): void => {
              setSearchParam(e.target.value as SearchParam)
            }}
          >
            {searchParams.map((param)=>{return <MenuItem value={param}>{param}</MenuItem>})}
          </Select>
        </FormControl>
        {true && 
        <TextField
          className='w-[150px]'
          size='small'
          value={searchValue}
          onChange={(e)=>{setSearchValue(e.target.value)}}
          hiddenLabel
          id="filled-hidden-label-small"
        />}
        
      </div>
    
      <CarTable rows={cars} onDeleteButtonClick={onDeleteButtonClick}/>
    </Container>
  );
}

type SearchParam = 'price'| 'regDate'| 'brand'| 'model'| 'transmission'| 'fuelType'

export default CarPage


