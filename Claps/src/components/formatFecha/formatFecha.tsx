export default function cambiarFecha(fecha: string): string {
	// Supongamos que fecha es una cadena de fecha válida, por ejemplo, "2023-11-14T08:00:00"
	const fechaMostrar = new Date(fecha);
  
	const dia: number = fechaMostrar.getDate();
	const mes: string = obtenerNombreMes(fechaMostrar.getMonth());
	const anio: number = fechaMostrar.getFullYear();
	const hora: string = fechaMostrar.getHours().toString().padStart(2, '0');
	const minutos: string = fechaMostrar.getMinutes().toString().padStart(2, '0');
  
	const fechaFormateada: string = `${dia} de ${mes} de ${anio} @ ${hora}:${minutos}`;
  
	// Devolver la fecha formateada
	return fechaFormateada;
}
  
// Función auxiliar para obtener el nombre del mes
function obtenerNombreMes(numeroMes: number): string {
	const meses: string[] = [
		'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
		'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
	];

	return meses[numeroMes];
}
