import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { Vehiculo } from '../models/Vehiculo';


//Clase desde donde se consume la API
@Injectable({ providedIn: 'root' })
export class ApiService{

    

    constructor(private httpClient: HttpClient){

    }

    //Obtener todos los vehiculos
    getVehiculos(): Observable<any>{
        return this.httpClient.get('http://localhost:3000/parqueadero/vehiculo');
    }

    //Agregar un nuevo vehiculo
    postVehiculo(vehiculo: Vehiculo): Observable<any>{
        return this.httpClient.post('http://localhost:3000/parqueadero/vehiculo',vehiculo);
    }

    //Actualizar vehiculo con la fecha y hora de salida
    patchVehiculo(vehiculo: Vehiculo): Observable<any>{
        const params = new HttpParams().set('placa',vehiculo.placa);        
        return this.httpClient.patch('http://localhost:3000/parqueadero/vehiculo/'+vehiculo.identifier,vehiculo);
    }

}