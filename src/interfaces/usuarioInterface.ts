export interface IUsuario {
  nombre: string;
  correo: string;
  contrasena: string;
  sucursal_id: string;
  accesos: Array<string>;
}
