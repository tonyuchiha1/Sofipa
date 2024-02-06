import { Empleado } from "./empleado"
import { Sucursal } from "./sucursal"

export class Region {
    idRegion:number| undefined
    nombreRegion:string| undefined
    descipcion:string| undefined
    estatus:string| undefined
    sucursal:Array<Sucursal>=new Array
    empleado:Array<Empleado>=new Array

}
