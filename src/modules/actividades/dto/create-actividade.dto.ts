export class CreateActividadeDto {
    titulo: string;
    descripcion: string;
    fecha?: Date;
    idCultivo?: string;
    empleados?: string[];
    idInsumos?: object[]; 
}
