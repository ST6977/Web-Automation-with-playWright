import {test , expect } from "@playwright/test";
import { readFromJSONFile } from "../Pages/utils/utils";
import LoginPage from "../Pages/LoginPage";



test.describe("User Login", ()   => {


    test("User Can Login Successfully" , async({page})  => {
        await page.goto("/");
    
    
        const registeredUser = readFromJSONFile();
    if(registeredUser){
        const login = new LoginPage(page);
        await login.loginUser(registeredUser.email,registeredUser.password )
    }
    else{
        console.log(" no user found");
    }
    })




 //Negative Test Case
    test("User can not Log in With Invalid Email", async ({page})  =>{
        await page.goto("/"); 
        const registeredUser = readFromJSONFile();
        const login = new LoginPage(page);
        await login.loginUser("hyhhyyt@gmail.com" , registeredUser.password )  
        await expect(page.getByText('Invalid email or password')).toBeVisible({ timeout: 40000 });
        
    
          })



    test("User can not Log in With Invalid password", async ({page})  =>{
        await page.goto("/"); 
        const registeredUser = readFromJSONFile();
        const login = new LoginPage(page);
        await login.loginUser( registeredUser.email  , "hfddf")  
        await expect(page.getByText('Invalid email or password')).toBeVisible({ timeout: 40000 });
        
    
        })
    

})








