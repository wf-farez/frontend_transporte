
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RutaService } from '../../../service/ruta.service';
import { Subscription } from 'rxjs';
import { Compania } from '../../../interface/compania';
import { CompaniaService } from '../../../service/compania.service';

@Component({
  selector: 'app-add-edit-ruta',
  templateUrl: './add-edit-ruta.component.html',
  styleUrls: ['./add-edit-ruta.component.css']
})
export class AddEditRutaComponent implements OnInit {

  @Input() displayAddEditModal: boolean = true;
  @Input() selectedRuta: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Registrar";
  
  rutaForm = this.fb.group({
    idRuta: [""],
    compania: null,
    nombreRuta: ["", Validators.required],
    origenRuta: ["", Validators.required],
    destinoRuta: ["", Validators.required],
  });


  companias: Compania[] = [];
  filteredCompanias: Compania[] = [];
  searchTerm: string = '';
  displayDetallesModalCompania=false;
  //displayAddModalRuta = false;
  selectedCompania: any = null;
  selectedEstado: string = '';
  subscriptions: Subscription[] = [];
  selectedFilter: string = 'cedula'; // Preselección del filtro
  filterValue: string = '';
  companiaV:Compania| any;

  constructor(private fb: FormBuilder, private RutaService: RutaService,
    private messageService: MessageService,
    private companiaService: CompaniaService,) { }

  ngOnInit(): void {
  
  }

  ngOnChanges(): void {

    if (this.selectedRuta) {
      this.modalType = 'Editar';

      this.selectedCompania= this.selectedRuta.compania;

      this.rutaForm.patchValue({
        idRuta: this.selectedRuta.idRuta,
        compania: this.selectedRuta.compania,
        nombreRuta: this.selectedRuta.nombreRuta,
        origenRuta: this.selectedRuta.origenRuta,
        destinoRuta: this.selectedRuta.destinoRuta
      });
    } else {
      this.rutaForm.reset();
      this.modalType = 'Registrar';
    }
  }

  closeModal() {
    this.rutaForm.reset();
    this.clickClose.emit(true);
  }

  registrarRuta() {
    if (this.modalType === 'Registrar') {

      this.rutaForm.patchValue({
        compania:this.companiaV
      });

      console.log(this.rutaForm.value)

      // Si es una nueva Ruta, eliminamos el campo idRuta del formulario
      const { idRuta, ...newRuta } = this.rutaForm.value;

      this.RutaService.registrarRuta(newRuta, this.selectedRuta).subscribe(
        response => {
          this.clickAddEdit.emit(response);
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Ruta added' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          console.log('Error occurred');
        }
      );
    } else if (this.modalType === 'Editar') {
      // Si es una Ruta existente, enviamos el formulario completo
      this.RutaService.registrarRuta(this.rutaForm.value, this.selectedRuta).subscribe(
        response => {
          this.clickAddEdit.emit(response);
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Ruta updated' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          console.log('Error occurred');
        }
      );
    }
  }

   // Filtrar companias según el filtro seleccionado
   filterBy(event: any) {
    const value = event?.target?.value;
    if (value) {
      if (this.selectedFilter === 'nombre') {
        this.filteredCompanias = this.companias.filter(compania => compania.nombreCompania.toLowerCase().includes(value.toLowerCase()));
      } else if (this.selectedFilter === 'direccion') {
        this.filteredCompanias = this.companias.filter(compania => compania.direccion.toLowerCase().includes(value.toLowerCase()));
      } 
    } else {
      // Si no se ha ingresado nada en el input, muestra todos los companias nuevamente
      this.obtenerCompaniasList();
    }
  }

   // Obtener la lista de companias
   obtenerCompaniasList() {
    this.companiaService.obtenerCompanias().subscribe(response => {
      this.companias = response;
      this.filteredCompanias = [...this.companias]; // Copia los companias al array filtrado inicialmente
    });
  }



  seleccionarCompania(compania: any){

    try {
    this.selectedCompania= compania;
  
    if (!this.selectedCompania) {
      throw new Error('No se ha seleccionado ninguna fila.');
    }
  
    console.log('Objeto ruta', this.selectedCompania);
    // Agrega condcutor  seleccionada a la objeto conductor      
    this.companiaV = {
      idCompania: this.selectedCompania.idCompania, 
      nombreCompania: this.selectedCompania.nombreCompania, 
      direccion: this.selectedCompania.direccion, 
    };

    this.rutaForm.patchValue({
      compania:this.companiaV
    });
  
    // Opcionalmente, puedes enviar un mensaje de éxito
    //this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Ruta asignada correctamente.' });
  } catch (error) {
    console.error('Error:', error);
  }
        }



  // Mostrar modal para agregar viaje
  showAddModalCompania() {
    this.displayDetallesModalCompania = true;
    this.obtenerCompaniasList();
    
  }

  // Ocultar modal de agregar/editar viaje
  hideAddModalCompania(isClosed: boolean) {
    this.displayDetallesModalCompania= !isClosed;
    //this.obtenerViajesList();
  }

  closeModalCompania() {
    this.displayDetallesModalCompania= false;
    // this.viajeForm.reset();
    // this.clickClose.emit(true);
  }



}
