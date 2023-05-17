import CerrarBtn from "../img/cerrar.svg";
import { useState, useEffect } from "react";
import Mensaje from "./Mensaje";
import { categorias  } from "../helpers/categorias";

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar}) => {

  const [ mensaje, setMensaje ] = useState("");  
  const [ nombre, setNombre ] = useState("");
  const [ cantidad, setCantidad ] = useState(0);    
  const [ id, setId ] = useState("");
  const [ fecha, setFecha ] = useState("");

  const [ categoria, setCategoria ] = useState(categorias[0]);  

  useEffect( () => {
    if( Object.keys(gastoEditar).length > 0 ) {
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setId(gastoEditar.id);
      setFecha(gastoEditar.fecha);
    }
  }, [] );

  useEffect(() => {
    if ( mensaje )
    {
      setTimeout( () => {
        setMensaje("");
      }, 2000 );
    }  
  }, [mensaje]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if( [nombre, cantidad, categoria].includes("") ) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }
    guardarGasto({nombre, cantidad, categoria, id, fecha});  
  };

  const ocultarModal = () => {    
    setAnimarModal(false);
    setTimeout(() =>{
      setModal(false);
    }, 500);    
  };

  return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img 
              src={CerrarBtn}
              alt="Cerrar modal"
              onClick={ocultarModal} />
        </div>
        <form 
          onSubmit={handleSubmit}       
          className={`formulario ${animarModal ? "animar" : "cerrar" }`}>
          <legend>{Object.keys(gastoEditar).length === 0 ? "Nuevo" : "Editar" + " gasto"}</legend>
          { mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
          <div className="campo">
            <label htmlFor="nombre">Nombre Gasto</label>
            <input 
              id="nombre"
              type="text"
              placeholder={Object.keys(gastoEditar).length === 0 ? "Añadir" : "Modificar" + " el nombre del gasto"}
              value={nombre}
              onChange={e => setNombre(e.target.value)}/>
          </div>
          <div className="campo">
            <label htmlFor="cantidad">Cantidad</label>
            <input 
              id="cantidad"
              type="number"
              placeholder={Object.keys(gastoEditar).length === 0 ? "Añadir" : "Modificar" + " la cantidad del gasto"}
              value={cantidad}
              onChange={e => setCantidad(Number(e.target.value))}/>
          </div>          
          <div className="campo">
            <label htmlFor="categoria">Categoría</label>
            <select 
              id="categoria"
              value={categoria}
              onChange={e => setCategoria(e.target.value)}>
                { categorias.map( c => {
                     return( 
                       <option 
                          key={c.id}  
                          value={c.valor}>
                        {c.caption}
                       </option> ); } )}
            </select>            
          </div> 
          <input
            type="submit"
            value={Object.keys(gastoEditar).length === 0 ? "Añadir" : "Modificar" +  " Gasto"}/>
        </form>
    </div>
  )
};

export default Modal;
