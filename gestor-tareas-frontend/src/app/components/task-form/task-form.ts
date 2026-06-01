import { Component, inject, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DevelopmentArea, Frequency, Priority, TaskRequestDto, TaskType } from '../../models/task.model';
import { Title } from '@angular/platform-browser';
import { Task } from '../../services/task';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { TaskTypePipe } from '../../pipes/task-type-pipe';
import { TaskPriorityPipe } from '../../pipes/task-priority-pipe';
import { TaskFrequencyPipe } from '../../pipes/task-frequency-pipe';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, TaskTypePipe, TaskPriorityPipe, TaskFrequencyPipe, RouterLink],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {

  // @Input() — recibe la tarea del padre
  @Input() task!: TaskRequestDto;

  taskId?: number;

  private title = inject(Title);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected taskService = inject(Task);
  private fb = inject(FormBuilder);

  private notificationService = inject(NotificationService);

  readonly priorities = Object.values(Priority);
  readonly taskTypes = Object.values(TaskType);
  readonly developmentAreas = Object.values(DevelopmentArea);
  readonly frequencies = Object.values(Frequency);

  error = "";

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    description: ['', [Validators.minLength(10), Validators.maxLength(200)]],
    taskPriority: [Priority.Low, [Validators.required]],
    taskType: [TaskType.Bug, [Validators.required]],
    expirationDate: ['', [Validators.required]],

    // Bug
    actualBehaviour: this.fb.control<string | null>(null),
    expectedBehaviour: this.fb.control<string | null>(null),

    // Improvement
    affectedFeature: this.fb.control<string | null>(null),
    expectedBenefict: this.fb.control<string | null>(null),

    // NewFeature
    area: this.fb.control<DevelopmentArea | null>(null),

    // RecurringTask
    frequency: this.fb.control<Frequency | null>(null),
    nextExecution: this.fb.control<string | null>(null),
  });

  get taskTitle() { return this.form.get('title'); }
  get description() { return this.form.get('description'); }
  get taskPriority() { return this.form.get('taskPriority'); }
  get taskType() { return this.form.get('taskType'); }
  get expirationDate() { return this.form.get('expirationDate'); }
  get selectedTaskType() { return this.form.get('taskType')?.value; }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.taskId = Number(id);
      this.title.setTitle('GestorTareas - Editar tarea');

      // Load existing task data
      this.taskService.getTaskById(this.taskId).subscribe({
        next: (taskData) => {
          if (taskData) {
            this.form.patchValue(taskData);
          }
        },
        error: () => {
          this.error = 'No se pudieron cargar los datos de la tarea.';
        }
      });

    } else {
      this.title.setTitle('GestorTareas - Crear tarea');

    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const dto = this.form.value as TaskRequestDto;
      if (this.taskId !== undefined) {
        this.taskService.edit(this.taskId, dto).subscribe({
          next: () => this.router.navigate(['/tasks']),
          error: () => {
            this.error = 'La edición de la tarea ha fallado.'
            this.notificationService.showError('La edición de la tarea ha fallado.')
          }
        });

      } else {
        this.taskService.createTask(dto).subscribe({
          next: () => {
            this.notificationService.showSuccess('Tarea creada correctamente.');
            this.router.navigate(['/tasks']);
          },
          error: (err) => {
            const message = err.error ?? 'La creación de la tarea ha fallado.';
            this.notificationService.showError(message);
          }
        });
      }
    } else {
      this.error = 'Completa todos los campos.';
    }
  }
}
