import { expect, test } from '@playwright/test'

test('home page renders title and counter', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Hello Vue 3' })).toBeVisible()
  await expect(page.getByText('count: 0')).toBeVisible()

  await page.getByRole('button', { name: '+1' }).click()

  await expect(page.getByText('count: 1')).toBeVisible()
})

test('navigates to about page', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: /关于本页/ }).click()

  await expect(page).toHaveURL('/about')
  await expect(page.getByRole('heading', { name: 'About' })).toBeVisible()
})
