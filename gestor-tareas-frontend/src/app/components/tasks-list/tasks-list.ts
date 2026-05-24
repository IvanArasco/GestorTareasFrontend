import { Component, inject } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { Task } from '../../services/task';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tasks-list',
  imports: [TaskCard],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css',
})

export class TasksList {

  protected taskService = inject(Task);
  private title = inject(Title);

  ngOnInit(): void {
    this.taskService.getTasks().subscribe();
    this.title.setTitle('GestorTareas - Listado de tareas');
    this.generateTasks();
  }

  onComplete(id: number): void {
    this.taskService.complete(id).subscribe();
  }

  onDelete(id: number): void {
    this.taskService.delete(id).subscribe();
  } 

  private generateTasks() { // Solo test
    this.taskService['_tasks'].set([
      {
        id: 1,
        title: "Login falla con email en mayúsculas",
        taskStatus: "Pending",
        taskPriority: "Critical",
        expirationDate: "2026-06-15",
        taskType: "Bug",
        userName: "admin123",
        actualBehaviour: "Devuelve 401 con email 'Usuario@empresa.com'",
        expectedBehaviour: "Debe autenticar independientemente del case del email"
      },
      {
        id: 2,
        title: "Formulario de registro pierde datos al volver atrás",
        taskStatus: "InProgress",
        taskPriority: "Medium",
        expirationDate: "2026-06-20",
        taskType: "Bug",
        userName: "admin123",
        actualBehaviour: "El formulario se resetea al navegar hacia atrás",
        expectedBehaviour: "Los campos deben conservar los valores introducidos"
      },
      {
        id: 3,
        title: "Añadir paginación al listado de tareas",
        taskStatus: "Pending",
        taskPriority: "Medium",
        expirationDate: "2026-07-01",
        taskType: "Improvement",
        userName: "admin123",
        affectedFeature: "GET /api/tasks",
        expectedBenefict: "Reducir tiempos de respuesta y carga en cliente"
      },
      {
        id: 4,
        title: "Mejorar mensajes de error en formulario de registro",
        taskStatus: "Completed",
        taskPriority: "Low",
        expirationDate: "2026-06-25",
        taskType: "Improvement",
        userName: "admin123",
        affectedFeature: "Formulario de registro",
        expectedBenefict: "El usuario entiende exactamente qué campo falla y por qué"
      },
      {
        id: 5,
        title: "Exportar listado de tareas a CSV",
        taskStatus: "Pending",
        taskPriority: "Low",
        expirationDate: "2026-07-15",
        taskType: "NewFeature",
        userName: "admin123",
        area: "Frontend"
      },
      {
        id: 6,
        title: "Notificación por email al asignar una tarea",
        taskStatus: "Pending",
        taskPriority: "Medium",
        expirationDate: "2026-08-01",
        taskType: "NewFeature",
        userName: "admin123",
        area: "Backend"
      },
      {
        id: 7,
        title: "Backup diario de base de datos",
        taskStatus: "InProgress",
        taskPriority: "Critical",
        expirationDate: "2026-12-31",
        taskType: "RecurringTask",
        userName: "admin123",
        frequency: "Daily",
        lastExecution: "2026-05-21",
        nextExecution: "2026-05-22"
      },
      {
        id: 8,
        title: "Revisión semanal de tareas pendientes",
        taskStatus: "Pending",
        taskPriority: "Low",
        expirationDate: "2026-12-31",
        taskType: "RecurringTask",
        userName: "admin123",
        frequency: "Weekly",
        lastExecution: "2026-05-15",
        nextExecution: "2026-05-22"
      }
    ]);
  }
}
