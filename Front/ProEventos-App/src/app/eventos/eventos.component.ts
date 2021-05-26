import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { error } from 'selenium-webdriver';
import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  modalRef: BsModalRef;
  public eventos: Evento[] = [];
  public eventosFiltrador: Evento[] = [];
  public larguraImagem = 150;
  public MargemImagem = 2;
  public exibirImagem = true;
  private filtroListrado = '';

  public get filtroLista(): string {
    return this.filtroListrado;
  }

  public set filtroLista(value: string) {
    this.filtroListrado = value;
    this.eventos = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventosFiltrador.filter((evento: { tema: string; local: string; }) =>
                                                  evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
                                                  evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1 );
  }

  constructor(private eventoService: EventoService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
                this.modalRef = new BsModalRef();
              }

  public ngOnInit(): void {
    this.getEventos();
    this.spinner.show();
  }

  public alterarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  public getEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosFiltrador = this.eventos;
      },
      error: () => {
        this.spinner.hide();
        this.toastr.error('Erro ao Carregar os Eventos', 'Error!');
      },
      complete: () => this.spinner.hide()
    });
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
    this.toastr.success('O Evento foi deletado com Sucesso', 'Deletado');
  }

  decline(): void {
    this.modalRef.hide();
  }

}
