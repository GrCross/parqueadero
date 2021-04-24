import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Vehiculo} from '../../models/Vehiculo';
import { ApiService } from 'src/app/services/api.services';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  
  conversion:any;
  vehiculos:Vehiculo[];
  costoMinuto:number = 10;
  contadorVehiculos:number = 0;

  inputPlaca:string = "";
  inputColor:string = "";
  inputMarca:string = "";
  inputTipoVehiculo:string = "";
  

  constructor(private apiService: ApiService,private modalService: NgbModal) { }

  ngOnInit(): void {

    //Carga todos los vehiculos
    this.apiService.getVehiculos().subscribe(data => {
      this.conversion=data
      this.vehiculos = this.conversion;
      this.contadorVehiculos = this.vehiculos.length;
    });

    
    
  }

  //Registra la hora de salida y el cuanto dinero hay que pagar
  toggleExit(id){
    this.vehiculos.map((v,i) =>{            
      
      if (i == id){
        const horaSalida = new Date();
        v.horaSalida = horaSalida.toUTCString();
        
        const horaIngreso = new Date(v.horaIngreso);      
        v.totalPago = (horaSalida.getMinutes() - horaIngreso.getMinutes())*this.costoMinuto;        
        this.apiService.patchVehiculo(v).subscribe(data => {
          
        })
      } 
      
      return v;
    })
  }

  //Agraga un nuevo vehiculo
  addVehiculo () {
    const newVehicle = {
      identifier:this.contadorVehiculos,
      placa:this.inputPlaca,
      color:this.inputColor,
      marca:this.inputMarca,
      tipoVehiculo:this.inputTipoVehiculo,
      horaIngreso:new Date().toUTCString(),
      horaSalida:null,
      totalPago:0
    }
    this.apiService.postVehiculo(newVehicle).subscribe(data => {
      
    });

    this.vehiculos.push(newVehicle);
    this.inputPlaca = "";
    this.inputColor = "";
    this.inputMarca = "";
    this.inputTipoVehiculo = "";
    this.contadorVehiculos+=1;
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.addVehiculo()
    });
  }

  

}
