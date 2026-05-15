import { Component } from '@angular/core';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',  
})
export class TaskCard {
  titulo = 'Preparar informe trimestral';
  nombreUsuario = 'Ana García';
  fechaLimite = '30 jun 2025';
  estaCompletada = false;
  tipo = 'Simple';
}
