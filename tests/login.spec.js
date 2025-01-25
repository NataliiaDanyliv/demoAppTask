import {test, expect} from "@playwright/test"
import {testData} from "../helper/data.js"

test.describe('Test Suite', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
        await page.fill('#username', 'admin');
        await page.fill('#password', 'password123');
        await page.click('button[type="submit"]');
    });

    for (let data of testData) {
        test(`Verify task: The ${data.task} in ${data.project}`, async ({ page }) => {

            // click on 'Web Application' OR 'Mobile Application' section
            await page.click(`${data.projectLocator}`);
            console.log(`PROJECT NAME ==>: ${data.project}`)
            
            // Verify 'Implement user authentication' OR 'Fix navigation bug' text is displayed
            const taskLocator = page.locator(`${data.taskLocator}`);
            await expect(taskLocator).toBeVisible();
            await expect(taskLocator).toContainText(`${data.task}`);
            console.log(`TEXT OF TASK ==>: ${data.task}`);

            // Verify 'To Do' OR 'In Progress' OR 'Done' column is displayed
            const columnLocator = page.locator(`${data.columnLocator}`);
            await expect(columnLocator).toBeVisible();
            await expect(columnLocator).toContainText(`${data.column}`);
            console.log(`TEXT OF COLUMN ==>: ${data.column}`);

            // verify each tag
            for (let tag of data.tags) {
                console.log(`TEXT OF TAG ==> : ${tag}`);
                const tagsLocator = page.locator(data.tagsLocator);
                console.log(await tagsLocator.textContent());
                await expect(tagsLocator).toContainText(tag);
            }
        });
    }
});
