export interface IUsuario {
  _id: string
  nombre: string;
  correo: string;
  contrasena: string;
  sucursal_id: string;
  accesos: Array<string>;
}
