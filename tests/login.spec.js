import {test, expect} from "@playwright/test"


    // const testData = [
    //   {
    //     project: 'Web Application',
    //     projectLocator: 'button:nth-child(1)',
    //     task: 'Implement user authentication',
    //     column: 'To Do',
    //     todoColumn: '.inline-flex > div:nth-child(1)',
    //     tags: ['Feature', 'High Priority']
    //   },
    //   {
    //     project: 'Web Application',
        // projectLocator: 'button:nth-child(1)',
    //     task: 'Fix navigation bug',
    //     column: 'To Do',
    //     todoColumn: '.inline-flex > div:nth-child(1)',
    //     tags: ['Bug']
    //   },
    //   {
    //     project: 'Web Application',
        // projectLocator: 'button:nth-child(1)',
    //     task: 'Design system updates',
    //     column: 'In Progress',
    //     todoColumn: '.inline-flex > div:nth-child(2)',
    //     tags: ['Design']
    //   },
    //   {
    //     project: 'Mobile Application',
        // projectLocator: 'button:nth-child(2)',
    //     task: 'Push notification system',
    //     column: 'To Do',
    //     todoColumn: '.inline-flex > div:nth-child(1)',
    //     tags: ['Feature']
    //   },
    //   {
    //     project: 'Mobile Application',
        // projectLocator: 'button:nth-child(2)',
    //     task: 'Offline mode',
    //     column: 'In Progress',
    //     todoColumn: '.inline-flex > div:nth-child(2)',
    //     tags: ['Feature', 'High Priority']
    //   },
    //   {
    //     project: 'Mobile Application',
        // projectLocator: 'button:nth-child(2)',
    //     task: 'App icon design',
    //     column: 'Done',
    //     todoColumn: '.inline-flex > div:nth-child(4)',
    //     tags: ['Design']
    //   }
    // ];

    const testData = [
    {
        project: 'Web Application',
        projectLocator: 'button:nth-child(1)',
        task: 'Implement user authentication',
        column: 'To Do',
        todoColumn: '.inline-flex > div:nth-child(1)',
        tagsLocator: ".inline-flex > div:nth-child(1) .gap-3 > div:nth-child(1) .flex-wrap",
        tags: ['Feature', 'High Priority']
    },
    {
        project: 'Web Application',
        projectLocator: 'button:nth-child(1)',
        task: 'Fix navigation bug',
        column: 'To Do',
        todoColumn: '.inline-flex > div:nth-child(1)',
        tags: ['Bug']
    },
    ];


    test.describe('Test Suite', () => {

        test.beforeEach(async ({ page }) => {
            await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
            await page.fill('#username', 'admin');
            await page.fill('#password', 'password123');
            await page.click('button[type="submit"]');
            // await page.waitForURL('https://animated-gingersnap-8cf7f2.netlify.app/dashboard');
        });

        for (let data of testData) {
            test(`Verify task: The ${data.task} in ${data.project}`, async ({ page }) => {

                // click on 'Web Application' OR 'Mobile Application' section
                await page.click(`text=${data.projectLocator}`);
                
                // Verify 'Implement user authentication' OR 'Fix navigation bug' text is displayed
                const taskLocator = page.locator(`${data.task}`);
                await expect(taskLocator).toBeVisible();

                        // await page.waitForTimeout(3000);
                
                // const columnLocator = taskLocator.locator(`xpath=ancestor::div[contains(@class, "column")]//h2[contains(text(), "${data.column}")]`);
                // div[contains(@class, 'flex flex-col w-80')]//h2[contains(text(), 'To Do')]
                const columnLocator = taskLocator.locator(`//div[contains(@class, 'flex flex-col w-80')]//h2[contains(text(), "${data.column}")]`);
                await expect(columnLocator).toBeVisible();
                

                // go over each tag
                for (let tag of data.tags) {
                const tagLocator = taskLocator.locator(`//div[contains(@class, 'inline-flex')]/div[1]//div[contains(@class, 'gap-3')]/div[1]//div[contains(@class, 'flex-wrap')]//span[contains(@class, 'rounded-full') and text()='${tag}']`);
                await expect(tagLocator).toBeVisible();
                }
            });
        }
    });