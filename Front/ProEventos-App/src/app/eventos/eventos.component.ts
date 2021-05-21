import { Component, OnInit } from '@angular/core';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFiltrador: any = [];
  larguraImagem: number = 150;
  MargemImagem: number = 2;
  exibirImagem: boolean = true;
  private _filtroLista: string = '';

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventos = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventosFiltrador.filter((evento: { tema: string; local: string; }) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
                                                                                      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1 );
  }

  constructor(private eventoService: EventoService) { }

  ngOnInit(): void {
    this.getEventos();
  }

  alterarImagem() {
    this.exibirImagem = !this.exibirImagem;
  }

  public getEventos(): void {
    this.eventoService.getEvento().subscribe(
      response => {
        this.eventos = response
        this.eventosFiltrador = this.eventos
      },
      error => console.log(error)
    );
  }

}
