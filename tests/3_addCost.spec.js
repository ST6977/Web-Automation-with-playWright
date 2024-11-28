import { test, expect } from "@playwright/test";
const { default: AddCostPage } = require("../Pages/AddCostPage");
const { default: LoginPage } = require("../Pages/LoginPage");
const { readFromJSONFile } = require("../Pages/utils/utils");

test.describe("User can add Item Successfully", ()=>{


    test.beforeEach( async ({page}) => {

        await page.goto("/");
        const loginPage = new LoginPage(page);
        const registeredUser = readFromJSONFile();
        await loginPage.loginUser(registeredUser.email, registeredUser.password);
         // Wait for the "Dashboard" text to be visible (use Playwright's locator)
    const dashboardLocator = page.locator('text=Dashboard');
    await expect(dashboardLocator).toBeVisible({ timeout: 10000 }); // Increase timeout if needed
       // await expect(page.getByText('Dashboard')).toBeVisible();
    
    
         // Add items using AddItemPage
    
        //  const addItemPage = new AddCostPage(page);
        //  const items = [
        //     { name: "Pen", quantity: 1, amount: "20", date: "2024-11-10", month: "November", remarks: "good" },
        //     { name: "Tiffin Box", quantity: 2, amount: "30", date: "2024-11-10", month: "November", remarks: "better" },
        //   ];
    
        //   for(const item of items){
        //     await addItemPage.addItem(item);
        //   }
    })



    test("User can Add  Item 1 successfully",async({page}) => {
        const addItemPage = new AddCostPage(page);
        await addItemPage.btnAddCost.click();
        await addItemPage.txtItemName.fill("Chiken");
        await addItemPage.btnIncrement.click();
        await addItemPage.btnIncrement.click();
        await addItemPage.txtAmount.fill("350");
        await addItemPage.txtPurchaseDate.fill("2024-12-11");
        await addItemPage.selectMonth.selectOption("September");
        await addItemPage.btnSubmit.click();
        await expect(addItemPage.btnAddCost).toBeVisible({ timeout: 40000 });

    })



    test("User can Add a Item 2 successfully",async({page}) => {
        const addItemPage = new AddCostPage(page);
        await addItemPage.btnAddCost.click();
        await addItemPage.txtItemName.fill("Egg");
        await addItemPage.btnIncrement.click();
        await addItemPage.btnIncrement.click();
        await addItemPage.txtAmount.fill("50");
        await addItemPage.txtPurchaseDate.fill("2024-12-11");
        await addItemPage.selectMonth.selectOption("September");
        await addItemPage.btnSubmit.click();
        await expect(addItemPage.btnAddCost).toBeVisible({ timeout: 40000 });

    })



    test("Assert Two Products Added Successfully", async ({ page }) => {
        const tbodyLocator = page.locator('tbody');
        await expect(tbodyLocator).toBeVisible({ timeout: 40000 }); 
        
        const countText =  page.locator("//div[@class='summary']/span");
        const rowCount = await countText.nth(0).innerText();
        expect(rowCount).toContain("2");
        
        
        
    
    });

})









