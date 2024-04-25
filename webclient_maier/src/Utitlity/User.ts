import {PasswordHasher} from "../Lib/PasswordHasher";

export default class User{
    private username : string;
    private money : number;
    private passwordHashed : string;


    public constructor(name : string, money : number, passwordHashed : string ){
        this.username = name;
        this.money = money;
        this.passwordHashed = passwordHashed;
    }


       // Getter methods
       getUsername(): string {
        return this.username;
    }

    getPasswordHashed(): string {
        return this.passwordHashed;
    }

    getMoney(): number {
        return this.money;
    }

    // Setter methods
    setName(name: string): void {
        this.username = name;
    }

    setPasswordHashed(passwordHashed: string): void {
        this.passwordHashed = passwordHashed;
    }

    setMoney(money: number): void {
        this.money = money;
    }

    // Method to print person's details
    printDetails(): string {
        return (`Name: ${this.username}, Money: ${this.money}, HashedPassword: ${this.passwordHashed}`);
    }
}
