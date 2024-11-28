import {test , expect} from "@playwright/test";
import Registration from "../Pages/Registration";
import {faker} from "@faker-js/faker";
import { readFromJSONFile, writeJSONFile } from "../Pages/utils/utils";

test.describe("User can Register Successfully",() => {
  test("User Can Sucessfully Register", async({page}) => {
    await page.goto("/");

    const reg = new Registration(page);

    function generatePhoneNumber(){
        return "01" + Math.floor(100000000 + Math.random() * 900000000).toString();
    }


    const phoneNumber =   generatePhoneNumber();


    const userData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: "sumaiyat610+" + Math.floor(Math.random() * 2000) + "@gmail.com", 
        password:"1234",
        phoneNumber: phoneNumber,
        address: faker.address.city(),
    };


    await reg.registerUser(userData);
    writeJSONFile(userData);
})


test("User can not register with already used email", async({page}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Welcome to daily finance" })
  ).toBeVisible();

  const reg = new Registration(page);
  const registeredUser = readFromJSONFile();

  function generatePhoneNumber(){
      return "01" + Math.floor(100000000 + Math.random() * 900000000).toString();//Try with more than 11 Numbers
  }


  const phoneNumber =   generatePhoneNumber();


  const userData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: registeredUser.email,
      password:"1234",
      phoneNumber: phoneNumber,
      address: faker.address.city(),
  };


  await reg.registerUser(userData);

   // Wait for the Toastify message to appear
   const toast = page.locator('.Toastify__toast'); 
   toast.waitFor(); // Replace with the correct selector for your Toastify message

   // Assert that the toast is visible and contains the expected message
   await expect(toast).toBeVisible({ timeout: 40000 }); // Wait for up to 5 seconds for the toast to appear
   await expect(toast).toHaveText("User with this email address already exists."); 
 
})



test("User can not register with Invalid Email Format", async({page}) => {
  await page.goto("/");
  const reg = new Registration(page);

  function generatePhoneNumber(){
    return "01" + Math.floor(100000000 + Math.random() * 900000000).toString(); 
  }


  const phoneNumber =   generatePhoneNumber();


  const userData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: "sumaiyat610+" + Math.floor(Math.random() * 2000) + "@test.com", 
      password:"1234",
      phoneNumber: phoneNumber,
      address: faker.address.city(),
  };


  await reg.registerUser(userData);






   // Wait for the toast message to appear and become visible (increase timeout)
   const toastLocator = page.locator('.Toastify__toast');
   await toastLocator.waitFor({ state: 'visible', timeout: 40000 }); // Wait for up to 40 seconds for the toast
 
   // Assert that the toast message contains the expected error text
   const msg = await toastLocator.textContent();
   console.log("Toast message:", msg); // Debugging log to inspect the message content
 
   // Assert that the toast message is visible and contains the correct error message
   await expect(toastLocator).toBeVisible({ timeout: 40000 });
   expect(msg).toContain("Only Gmail addresses are accepted.");
})
})


