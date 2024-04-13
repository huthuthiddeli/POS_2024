

export default class User{
    private name : string;
    private password : string;
    private passwordHashed : string;
    private money : number;


    public constructor(name : string, password : string, passwordHashed : string, money : number ){
        this.name = name;
        this.password = password;
        this.passwordHashed = passwordHashed;
        this.money = money;
    }


       // Getter methods
       getName(): string {
        return this.name;
    }

    getPassword(): string {
        return this.password;
    }

    getPasswordHashed(): string {
        return this.passwordHashed;
    }

    getMoney(): number {
        return this.money;
    }

    // Setter methods
    setName(name: string): void {
        this.name = name;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    setPasswordHashed(passwordHashed: string): void {
        this.passwordHashed = passwordHashed;
    }

    setMoney(money: number): void {
        this.money = money;
    }

    // Method to print person's details
    printDetails(): void {
        console.log(`Name: ${this.name}, Money: ${this.money}`);
    }
}