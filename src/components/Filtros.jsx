import { categorias } from "../helpers/categorias";

const Filtros = ({filtro, setFiltro}) => {

  return (
    <div className='filtros sombra contenedor'>
        <form>
            <div className='campo'>
                <label>Filtrar Gastos</label>
                <select
                  id="categoria"
                  value={filtro}
                  onChange={e => setFiltro(e.target.value)}>
                { categorias.map( c => {
                     return( 
                       <option 
                          key={c.id}  
                          value={c.valor}>
                        {c.caption}
                       </option> ); } )}
                </select>
            </div>
        </form>
    </div>
  )
};

export default Filtros;