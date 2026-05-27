export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical'
}

export enum Status {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

export enum DevelopmentArea {
  Frontend = 'Frontend',
  Backend = 'Backend',
  BD = 'BD'
}

export enum Frequency {
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly'
}

export enum TaskType {
  Bug = 'Bug',
  Improvement = 'Improvement',
  NewFeature = 'NewFeature',
  RecurringTask = 'RecurringTask'
}

interface TaskBaseDto {
  title: string;
  description?: string;
  taskPriority: Priority;
  expirationDate: string;
  taskType: TaskType;

  // Bug
  expectedBehaviour?: string;
  actualBehaviour?: string;

  // Improvement
  affectedFeature?: string;
  expectedBenefict?: string;

  // New Feature
  area?: DevelopmentArea;

  // Recurring
  frequency?: Frequency;
  lastExecution?: string;
  nextExecution?: string;
}

export interface TaskRequestDto extends TaskBaseDto { }

export interface TaskResponseDto extends TaskBaseDto {
  id: number;
  taskStatus: Status;
  userName: string;
  userId: number;
}