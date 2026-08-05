export type GoalPriority = 'low' | 'medium' | 'high';

export interface GoalDraft {
  text: string;
  priority: GoalPriority;
  dueDate: string | null;
}

export interface CourseGoal {
  text: string;
  id: string;
  completed: boolean;
  createdAt: string;
  priority: GoalPriority;
  dueDate: string | null;
}
