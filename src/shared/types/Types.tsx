export type GoalPriority = 'low' | 'medium' | 'high';

export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

export interface GoalDraft {
  text: string;
  priority: GoalPriority;
  dueDate: string | null;
  category: string;
}

export interface CourseGoal {
  text: string;
  id: string;
  completed: boolean;
  createdAt: string;
  priority: GoalPriority;
  dueDate: string | null;
  category: string;
  subtasks: Subtask[];
}
