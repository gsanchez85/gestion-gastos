import PropTypes from "prop-types";
import { formatCurr } from "../helpers/Index";
import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({gastos, setGastos, presupuesto, setPresupuesto, setIsValidPrespuesto}) => {

  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect( () => {
    const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0 );
    setGastado(totalGastado);
    const totalDisponible = presupuesto - totalGastado;
    setDisponible(totalDisponible);
    const nuevoPorcentaje = ( ( ( presupuesto - totalDisponible ) / presupuesto ) * 100 ).toFixed(2);
    setTimeout( () => {
      setPorcentaje(nuevoPorcentaje);
    }, 1500 );
  },[gastos]);

  const handleResetApp = () => {
     const confirmar = confirm('¿Desea reiniciar presupuesto y gastos?');
     if (confirmar) {
       setGastos([]);
       setPresupuesto(0);
       setIsValidPrespuesto(false); 
     }
  };

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        {/* Referencia a CircularProgressBar: npmjs.com/package/react-circular-progressbar*/}
        <div><CircularProgressbar
                styles={buildStyles({
                  pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                  trailColor: '#F5F5F5',
                  textColor: '#3B82F6' })
                }
                value={porcentaje}
                text={`${porcentaje}% gasto`}   
                 /></div>
        <div className="contenido-presupuesto">
            <button 
              className="reset-app"
              type="button"
              onClick={handleResetApp}>
              Resetear App
            </button>
            <p>
              <span>Presupuesto:</span>{` ${formatCurr(presupuesto)} `}  
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
              <span>Disponible:</span>{` ${formatCurr(disponible)} `}  
            </p>
            <p>
              <span>Gastado:</span>{` ${formatCurr(gastado)} `}  
            </p>                        
        </div>
    </div>
  )
}

ControlPresupuesto.defaultProp = {
  presupuesto: 0,
  disponible: 0,
  gastado: 0
};

ControlPresupuesto.propType = {
  presupuesto: PropTypes.number.isRequired,
  disponible: PropTypes.number.isRequired,
  gastado: PropTypes.number.isRequired
};

export default ControlPresupuesto