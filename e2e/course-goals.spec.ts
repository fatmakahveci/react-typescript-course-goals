import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-hydrated', 'true');
});

test('manages a goal from creation through completion', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Course goal' }).fill('Complete the TypeScript project');
  await page.locator('#goal-form select').selectOption('high');
  await page.locator('#goal-form input[type="date"]').fill('2027-01-15');
  await page.getByRole('button', { name: 'Add goal' }).click();

  const goal = page.getByRole('listitem').filter({ hasText: 'Complete the TypeScript project' });
  await expect(goal).toContainText('high');
  await expect(goal).toContainText('Due Jan 15, 2027');

  await goal.getByRole('button', { name: /Edit goal/ }).click();
  await page.getByRole('textbox', { name: 'Edit goal' }).fill('Ship the TypeScript project');
  await page.getByRole('button', { name: 'Save' }).click();
  const editedGoal = page.getByRole('listitem').filter({ hasText: 'Ship the TypeScript project' });
  await expect(editedGoal).toBeVisible();

  await editedGoal.getByRole('checkbox').check();
  await expect(page.getByText('1 of 3 completed')).toBeVisible();
  await page.getByRole('button', { name: 'Active' }).click();
  await expect(editedGoal).toBeHidden();
});

test('keeps goals after a page reload', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Course goal' }).fill('Persist this goal');
  await page.getByRole('button', { name: 'Add goal' }).click();
  await expect(page.getByText('Persist this goal')).toBeVisible();
  await expect.poll(async () => page.evaluate(() => window.localStorage.getItem('course-goals')))
    .toContain('Persist this goal');

  await page.reload();

  await expect(page.getByText('Persist this goal')).toBeVisible();
});
