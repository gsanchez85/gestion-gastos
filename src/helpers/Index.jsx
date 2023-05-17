export const generarId = () => {
    return Math.random().toString(36) + Date.now().toString(36);
};

export const formatCurr = (curr) => {
    return (
      curr.toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }) )
};

export const formatDateTime = (date) => {
    const newDate = new Date(date);
    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    };
    return ( newDate.toLocaleDateString('es-ES', options ) )  
};