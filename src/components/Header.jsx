import NuevoPresupuesto from './NuevoPresupuesto';
import ControlPresupuesto from './ControlPresupuesto';

const Header = ({gastos, setGastos, presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPrespuesto}) => {
  return (
    <header>
        <h1>Planificador de Gastos</h1>
        { isValidPresupuesto ? 
          <ControlPresupuesto 
            gastos={gastos}
            setGastos={setGastos}
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPrespuesto={setIsValidPrespuesto}/> :
          (
            <NuevoPresupuesto
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              setIsValidPrespuesto={setIsValidPrespuesto}/>
          )}        
    </header>    
  )
};

export default Header;
