export   const formatDate = (date) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  }