import { test, expect } from "@playwright/test";
import ProfileUpdatePage from "../Pages/ProfileUpdatePage";
import LoginPage from '.././Pages/LoginPage';
import { readFromJSONFile } from "../Pages/utils/utils";


test.describe("User can Upload Successfully", () => {
    test.beforeEach( async ({page}) => {
        const registeredUser = readFromJSONFile();
        await page.goto("/");
        const loginPage = new LoginPage(page);
    
        await loginPage.loginUser(registeredUser.email, registeredUser.password);
         // Wait for the "Dashboard" text to be visible (use Playwright's locator)
        const dashboardLocator = page.locator('text=Dashboard');
        await expect(dashboardLocator).toBeVisible({ timeout: 40000 }); // Increase timeout if needed
})



test("User can upload profile picture successfully and Then Do Logout",async({page})  => {
    const uploadNewImg = new ProfileUpdatePage(page);



    // Ensure Profile Icon button is visible and click it
 
    await uploadNewImg.btnUserAccount.click();
    await uploadNewImg.btnProfile.click();
    await uploadNewImg.btnEdit.click();
    await uploadNewImg.btnChooseFile.setInputFiles("./resources/images.jpg");



    // Listen for any dialog (alert, confirm, prompt)
    const alertMessages = []
    page.on('dialog', async dialog => {
    alertMessages.push(dialog.message());
      await dialog.accept();

    });


  await uploadNewImg.btnUploadImage.click();


  await page.waitForEvent('dialog');
  await page.waitForTimeout(1000);

  await uploadNewImg.btnUpdate.click();


  await page.waitForEvent('dialog');
   
  expect(alertMessages[0]).toBe('Image uploaded successfully!');
  expect(alertMessages[1]).toBe('User updated successfully!');
  

  await page.getByLabel("account of current user").click();
  await page.getByRole("menuitem", { name: "Logout" }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible({ timeout: 40000 }); 
 
 









    
})

})