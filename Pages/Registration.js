const { name } = require("../playwright.config");
const { expect } = require('@playwright/test');

class Registration{
    constructor(page){
        this.page = page;
        this.registerLink = page.getByRole("link" , {name: "Register"})
        this.firstNameInput  = page.getByLabel("First Name *")
        this.lastNameInput = page.getByLabel("Last Name")
        this.emailInput = page.getByLabel("Email *")
        this.passwordInput = page.getByLabel("Password *")
        this.phoneNumberInput = page.getByLabel("Phone Number *");
        this.addressInput = page.getByLabel("Address"); 
        this.selectGender = page.getByRole("radio");
        this.termsCheckBox = page.getByRole("checkbox");
        this.registerBtn = page.getByRole("button", {name: "Register"});
        this.alertToast = page.getByRole("alert");

    }


    async registerUser(user){
        await this.registerLink.click();
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.phoneNumberInput.fill(user.phoneNumber);
        await  this.addressInput.fill(user.address);
        await this.selectGender.first().check();
        await this.termsCheckBox.check();
        await this.registerBtn.click();




        // Wait for the alert toast to be visible
        await this.alertToast.waitFor({ state: "visible" });

        // Assert that the alert toast is visible
        await expect(this.alertToast).toBeVisible();



   

     

        


    }
}

export default Registration;