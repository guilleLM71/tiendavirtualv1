/* eslint-disable jsx-a11y/accessible-emoji */

import { BiFirstPage, BiLastPage } from "react-icons/bi"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

export const Pagination = ({ activePage, count, rowsPerPage, totalPages, setActivePage }) => {
    const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1
    const end = activePage === totalPages ? count : beginning + rowsPerPage - 1
  
    return (
      <>
        <div className="pag-content ">
         
          <div className="pag-texts">
          <p style={{color: "#000000",}}>
          Pagina {activePage} de {totalPages}
        </p>
        <p style={{color: "#000000",}}>
          Registros: {beginning === end ? end : `${beginning} - ${end}`} of {count}
        </p>
          </div>
 <div>
          <button disabled={activePage === 1} onClick={() => setActivePage(1)}>
            <BiFirstPage color="black" size={35} className="pag-arrows"/>
          </button>
          <button >
            <IoIosArrowBack color="black" size={35}  className="pag-arrows"/>
          </button>
          <button disabled={activePage === totalPages} onClick={() => setActivePage(activePage + 1)}>
           <IoIosArrowForward color="black" size={35} className="pag-arrows " />
          </button>
          <button disabled={activePage === totalPages} onClick={() => setActivePage(totalPages)}>
            <BiLastPage color="black" size={35} className="pag-arrows" />
          </button>

          </div>
          
        </div>
       
      </>
    )
  }
  