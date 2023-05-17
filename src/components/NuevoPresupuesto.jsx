/* eslint-disable no-unused-vars */
import { useState } from "react";
import Mensaje from './Mensaje';
import PropTypes from "prop-types";

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPrespuesto}) => {

  const [mensaje, setMensaje] = useState("");

  const handlePresupuesto = (e) => {
     e.preventDefault();
     if (!presupuesto || presupuesto < 0) {
       setMensaje("No es un presupuesto válido");
       setIsValidPrespuesto(false);
       return;
     }
     setMensaje("");
     setIsValidPrespuesto(true);
  };

  return (
    <div onSubmit={handlePresupuesto} className="contenedor-presupuesto contenedor sombra">
      <form className="formulario">
        <div className="campo">
          <label>Definir Presupuesto</label>      
          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu prespuesto"  
            value={presupuesto}         
            onChange={e => setPresupuesto(Number(e.target.value))}
          />
        </div>
        <input type="submit" value="Añadir"/>
        {!!mensaje && 
            <Mensaje tipo="error">{mensaje}</Mensaje> }
      </form>
    </div>
  )
};

NuevoPresupuesto.defaultProps = {
    presupuesto: 0
};
  
NuevoPresupuesto.propTypes = {
    presupuesto: PropTypes.number.isRequired,
    setPresupuesto: PropTypes.func.isRequired,
    setIsValidPrespuesto: PropTypes.func.isRequired
};

export default NuevoPresupuesto;
