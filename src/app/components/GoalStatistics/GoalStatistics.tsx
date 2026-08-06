import type { CourseGoal, GoalPriority } from '@/shared/types/Types';
import styles from './GoalStatistics.module.css';

type Props = {
  goals: CourseGoal[];
};

const priorities: GoalPriority[] = ['high', 'medium', 'low'];

const GoalStatistics = ({ goals }: Props) => {
  const completed = goals.filter((goal) => goal.completed).length;
  const completionRate = goals.length === 0 ? 0 : Math.round((completed / goals.length) * 100);
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 6);
  weekStart.setHours(0, 0, 0, 0);
  const completedThisWeek = goals.filter((goal) => goal.completedAt && new Date(goal.completedAt) >= weekStart).length;
  const today = new Date().toISOString().slice(0, 10);
  const overdue = goals.filter((goal) => goal.dueDate && !goal.completed && goal.dueDate < today).length;
  const subtasks = goals.flatMap((goal) => goal.subtasks);
  const completedSubtasks = subtasks.filter((subtask) => subtask.completed).length;
  const priorityCounts = priorities.map((priority) => ({
    label: priority,
    value: goals.filter((goal) => goal.priority === priority).length,
  }));
  const categoryCounts = Object.entries(goals.reduce<Record<string, number>>((counts, goal) => ({
    ...counts,
    [goal.category]: (counts[goal.category] ?? 0) + 1,
  }), {})).sort((first, second) => second[1] - first[1]);
  const largestCategory = Math.max(1, ...categoryCounts.map(([, count]) => count));

  return (
    <details className={styles.statistics}>
      <summary>Statistics</summary>
      <div className={styles.metrics}>
        <div><strong>{completionRate}%</strong><span>Completion rate</span></div>
        <div><strong>{completedThisWeek}</strong><span>Completed this week</span></div>
        <div><strong>{overdue}</strong><span>Overdue goals</span></div>
        <div><strong>{completedSubtasks}/{subtasks.length}</strong><span>Subtasks completed</span></div>
      </div>
      <div className={styles.distributions}>
        <section aria-labelledby="priority-statistics">
          <h2 id="priority-statistics">Priority distribution</h2>
          {priorityCounts.map(({ label, value }) => (
            <div className={styles.row} key={label}>
              <span>{label[0].toUpperCase() + label.slice(1)}</span>
              <div><i style={{ width: `${goals.length ? (value / goals.length) * 100 : 0}%` }} /></div>
              <strong>{value}</strong>
            </div>
          ))}
        </section>
        <section aria-labelledby="category-statistics">
          <h2 id="category-statistics">Top categories</h2>
          {categoryCounts.length > 0 ? categoryCounts.slice(0, 4).map(([label, value]) => (
            <div className={styles.row} key={label}>
              <span>{label}</span>
              <div><i style={{ width: `${(value / largestCategory) * 100}%` }} /></div>
              <strong>{value}</strong>
            </div>
          )) : <p>No category data yet.</p>}
        </section>
      </div>
    </details>
  );
};

export default GoalStatistics;
