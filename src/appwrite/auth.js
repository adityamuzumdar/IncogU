import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }
    
    async createAccount({email, password}) {
        try {
            console.log(email);
            console.log(password);

            const userAccount = await this.account.create(ID.unique(), email, password);
            if (userAccount) {
                // call another method
                return this.verification({email,password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async verification({email,password}) {
        try {
            await this.account.createEmailSession(email, password);
            const emailverification = await this.account.createVerification('http://127.0.0.1:5173/verify');
            if (emailverification) {
                // call another method
                console.log("sent");
                this.completeverification;
                
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    async emailverification(email) {
        try {
            const emailverification = await this.account.createVerification('http://127.0.0.1:5173/signup');

            if (emailverification) {
                // call another method
                console.log("sent");
                // this.completeverification;
                
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    async completeverification() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const secret = urlParams.get('secret');
            const userId = urlParams.get('userId');

            console.log("i am in completeverification")
            this.account.updateVerification(userId, secret);


        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService


