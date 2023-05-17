import PropTypes from 'prop-types';

const Mensaje = ({children, tipo}) => {

  return (
    <div className={`alerta ${tipo}`}>{children}</div>
  );
};

Mensaje.propDefault = {
  tipo: "error"
};

Mensaje.propTypes = {
  tipo: PropTypes.string.isRequired
};

export default Mensaje;