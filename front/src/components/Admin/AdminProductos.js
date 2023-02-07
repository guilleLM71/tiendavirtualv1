
//import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import axios from 'axios'
import React, { useState, useMemo, useEffect } from 'react'
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from 'react-icons/ai'
import { BiSort, BiSortDown, BiSortUp } from 'react-icons/bi'
import {TbListDetails } from 'react-icons/tb'
import Swal from 'sweetalert2'
import { useStateValue } from '../../context/StateProvider'
import AdminEditarProductos from './AdminEditarProductos'
import AdminRegistrarProductos from './AdminRegistrarProductos'
import { sortRows, filterRows, paginateRows } from './helpers'
import Modal from './Modal'
import { Pagination } from './Pagination'
const columns = [
    { accessor: 'id', label: 'Id' },
    { accessor: 'titulo', label: 'Titulo' },
    { accessor: 'subtitulo', label: 'Subtitulo'},
    { accessor: 'descripcion', label: 'Descripcion' },
    { accessor: 'precio', label: 'Precio'},
    { accessor: 'stock', label: 'Stock'},
    { accessor: 'imagen', label: 'Imagen'},
    ]
function AdminProductos(props) {
  const [rows,setRows]=useState([])
    //const router=useRouter()
  const [activePage, setActivePage] = useState(1)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' })
  const rowsPerPage = 5

  const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters])
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)

  const count = filteredRows.length
  const totalPages = Math.ceil(count / rowsPerPage)

  useEffect( ()=>{
    getproductos()
  },{})

async function getproductos(){
  try {

    await axios.get(
      `http://localhost:4000/api/productos/getproductos`,
      {
        headers: {
          "Content-Type": "application/json"
         },
      }
    ).then((res)=>{  
     console.log('res :>> ', res);
     setRows(res.data)

    });
   // navigate('/admin/products');
  } catch (err) {
      console.log('err :>> ', err);
  }
}
async function eliminarproducto(id){
  try {

    await axios.delete(
     `http://localhost:4000/api/productos/eliminarproducto/${id}` ,
      {
        headers: {
          "Content-Type": "application/json"
         },
      }
    ).then((res)=>{  
     console.log('res :>> ', res);
     //setRows(res.data)
     Swal.fire({
      title: "Producto eliminado correctamente",
      icon: 'success',
      confirmButtonText: 'Cerrar'
    })
   });
 
   // navigate('/admin/products');
  } catch (err) {
      console.log('err :>> ', err);
      Swal.fire({
        title: err,
        icon: 'error',
        confirmButtonText: 'Cerrar'
      })
 
  }
}

  const handleSearch = (value, accessor) => {
    setActivePage(1)

    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }))
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters }
        delete updatedFilters[accessor]

        return updatedFilters
      })
    }
  }

  const handleSort = (accessor) => {
    setActivePage(1)
    setSort((prevSort) => ({
      order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
      orderBy: accessor,
    }))
  }

  const clearAll = () => {
    setSort({ order: 'asc', orderBy: 'id' })
    setActivePage(1)
    setFilters({})
  }
    return (
        <div>
            <div className='productos'> 

                
               <h2>
                Productos
                </h2> 
            </div >
            <div style={{padding: "0.5rem",
                          margin: "0.5rem",
                          }}>
              <Modal tbtn={"Agregar Producto"}
                
              >
                  <AdminRegistrarProductos></AdminRegistrarProductos>

              </Modal>
              </div>
            <table className=''>
        <thead className=' '>
          <tr className=' '>
            {columns.map((column) => {
              const sortIcon = () => {
                if (column.accessor === sort.orderBy) {
                  if (sort.order === 'asc') {
                    return <BiSortUp width={50} height={50}/>
                  }
                  return <BiSortDown width={50} height={50}/>
                } else {
                  return <BiSort width={50} height={50}/>
                }
              }
              return (
                <th className=''key={column.accessor}>
                  <span >{column.label}</span>
                  <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>
                </th>
              )
            })}
              <th >
                
            </th>
          </tr>
          <tr>
            {columns.map((column) => {
              return (
                <th>
                  <input 
                  className='in-buscar'
                    key={`${column.accessor}-search`}
                    type="search"
                    placeholder={`Buscar ${column.label}`}
                    value={filters[column.accessor]}
                    onChange={(event) => handleSearch(event.target.value, column.accessor)}
                  />
                </th>
              )
            })
              
            }
            <th colSpan={2}>
                 Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {calculatedRows.map((row) => {
            return (
              <tr key={row.id}>
                {columns.map((column) => {
                  if (column.accessor=="imagen") {
                    return(
                      <img className='imagen-prod' key={column.accessor}
                        src={row[column.accessor]} width={80} height={80}
                      >
                     </img>)
                  }
                  return(
                    <td className='imagen-prod' key={column.accessor}>
                    {row[column.accessor]}
                    </td>)
                })}
                <td className=''>
            
                  <>
                <Modal
                tbtn={<AiFillEdit size={20}></AiFillEdit>}
                  
                >
                  <AdminEditarProductos id={row.id} producto={row}></AdminEditarProductos>
                </Modal>
                 <button
                    className="btn-modal"
                    type="button"
                    onClick={() => eliminarproducto(row.id) }
                  >
                  {  <AiFillDelete  color={"red"} size={20}></AiFillDelete>}
                  </button>
                
                  
                  </>
                  
                  

                
               
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {count > 0 ? (
        <Pagination
          activePage={activePage}
          count={count}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      ) : (
        <p className='text-black' >No data found</p>
      )}

        </div>
    );
}

export default AdminProductos;