import { useState, useEffect } from "react";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import { generarId } from "./helpers/Index";
import IconoNuevoGasto from './img/nuevo-gasto.svg';
import Filtros from "./components/Filtros";

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPrespuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);
  
  useEffect( () =>{
    if (Object.keys(gastoEditar).length > 0)
      handleEditaGasto();    
  }, [gastoEditar] );

  useEffect( () => {
    localStorage.setItem( 'presupuesto', presupuesto ?? 0); 
  }, [presupuesto]);

  useEffect( () => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto'));
    if ( presupuestoLS > 0 ) {
      setIsValidPrespuesto(true);
    }
  }, []);

  useEffect( () => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect( () => {
    if (filtro){
      // Filtrar gastos por categoría 
      const gastosFiltrados1 = gastos.filter( g => g.categoria === filtro);
      setGastosFiltrados(gastosFiltrados1);
    }
  }, [filtro]);

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
    setTimeout(() =>{
      setAnimarModal(true);
    }, 500);
  };

  const handleEditaGasto = () => {
    setModal(true);
    setTimeout(() =>{
      setAnimarModal(true);
    }, 500);
  };  
  
  const guardarGasto = gasto => {
    if (gasto.id) 
    {
      // Actualiza gasto
      const gastosActualizados = gastos.map(g => g.id === gasto.id ? gasto : g);
      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      // Nuevo gasto
      gasto.id = generarId();      
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);      
    }
    setAnimarModal(false);
    setTimeout(() =>{
      setModal(false); 
      setGastoEditar({});     
    }, 500);    
  };

  const eliminarGasto = id => {
      const gastosEliminados = gastos.filter(g => g.id !== id);
      setGastos(gastosEliminados);   
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}   
        setGastos={setGastos}  
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPrespuesto={setIsValidPrespuesto}/>
      { isValidPresupuesto && 
      <>
        <main>
          <Filtros filtro={filtro}
                   setFiltro={setFiltro} />
          <ListadoGastos
            gastos={gastos}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}/>
        </main>
        <div className="nuevo-gasto">
            <img 
              src={IconoNuevoGasto}
              alt="Icono nuevo gasto"
              onClick={handleNuevoGasto} />
        </div> 
      </>}
      { modal && <Modal 
                   setModal={setModal}
                   animarModal={animarModal}
                   setAnimarModal={setAnimarModal}
                   guardarGasto={guardarGasto}
                   gastoEditar={gastoEditar}/>}
        
    </div>
  )
}

export default App
