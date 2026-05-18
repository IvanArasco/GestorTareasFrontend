export type Status = 'Pending' | 'InProgress' | 'Completed' | 'Cancelled';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
export type DevelopmentArea = 'Frontend' | 'Backend' | 'BD';
export type Frequency = 'Daily' | 'Weekly' | 'Monthly';

export interface TaskResponseDto {
  id: number;
  title: string;
  taskStatus: Status;
  taskPriority: Priority;
  expirationDate: string;
  taskType: string;
  userName: string;

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