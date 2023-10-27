import { Injectable } from '@angular/core';
import { Md5 } from 'md5-typescript';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private toastr: ToastrService) { }

  toastrSuccess(message: string){
    this.toastr.success(message);
  }

  toastrError(message: string){
    this.toastr.error(message);
  }

  alertConfirmation(message: string){
    return Swal.fire({
      title: 'Atenção',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    })
  }

  alertSuccess(message: string){
    Swal.fire('Sucesso', message, 'success');
  }

  md5(value: string){
    return Md5.init(value);
  }

  //convert monetary real br to float
  convertToFloat(value: string){
    return parseFloat(value.replace('.', '').replace(',', '.'));
  }

  //convert float to monetary real br
  convertToMonetary(value: number){
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  }
}
