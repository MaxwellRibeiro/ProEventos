import { Component, OnInit } from '@angular/core';
import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

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

  constructor(private eventoService: EventoService) { }

  public ngOnInit(): void {
    this.getEventos();
  }

  public alterarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  public getEventos(): void {
    this.eventoService.getEventos().subscribe(
      (eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosFiltrador = this.eventos;
      },
      error => console.log(error)
    );
  }

}
