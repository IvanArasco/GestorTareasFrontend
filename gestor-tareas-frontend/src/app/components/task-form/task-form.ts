import { Component, inject, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DevelopmentArea, Frequency, Priority, TaskRequestDto, TaskType } from '../../models/task.model';
import { Title } from '@angular/platform-browser';
import { Task } from '../../services/task';
import { Router } from '@angular/router';
import { TaskTypePipe } from '../../pipes/task-type-pipe';
import { TaskPriorityPipe } from '../../pipes/task-priority-pipe';
import { TaskFrequencyPipe } from '../../pipes/task-frequency-pipe';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, TaskTypePipe, TaskPriorityPipe, TaskFrequencyPipe],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {

  // @Input() — recibe la tarea del padre
  @Input() task!: TaskRequestDto;

  private title = inject(Title);
  private router = inject(Router);
  protected taskService = inject(Task);
  private fb = inject(FormBuilder);

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
    actualBehaviour: [null],
    expectedBehaviour: [null],

    // Improvement
    affectedFeature: [null],
    expectedBenefict: [null],

    // NewFeature
    area: [null],

    // RecurringTask
    frequency: [null],
    nextExecution: [null],
  })

  get taskTitle() { return this.form.get('title'); }
  get description() { return this.form.get('description'); }
  get taskPriority() { return this.form.get('taskPriority'); }
  get taskType() { return this.form.get('taskType'); }
  get expirationDate() { return this.form.get('expirationDate'); }
  get selectedTaskType() { return this.form.get('taskType')?.value; }

  ngOnInit(): void {
    this.title.setTitle('GestorTareas - Crear tarea');
  }

  onSubmit(): void {
    if (this.form.valid) {
      const dto = this.form.value as TaskRequestDto;
      this.taskService.createTask(dto).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: () => this.error = 'La creación de la tarea ha fallado.'
      });
    } else {
      this.error = 'Completa todos los campos.';
    }
  }

}
