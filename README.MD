# POS Projekt 2024

## Description

This repo provides a spring boot application that connects to a local MongoDB database and provides basic CRUD-Operation.

## Table of Contents 
- [Installation](#installation)
- [Webserver](#webserver)
- [WPF Application](#wpf-application)
- [Angular Webclient](#angular-webclient)

## Installation
Simply download the repository and then fire up [**Intellij**](https://www.jetbrains.com/de-de/idea/) and start the project simply by pressing the button.
For the **Webclient** you may have to use:

```bash
npm install
```

after installing all of the dependencies you can start the application in the CLI via

```bash
ng serve
```
**IMPORTANT** to note is that the **Angular CLI** is needed in order for this to work. You can install that dependency with node or at [**Angular**](https://angular.io/cli):

```
npm install -g @angular/cli
```

## Webserver

The webserver uses [**Springboot**](https://start.spring.io) in order to build a webapplication utilizing the CRUD-Repository. Like your average webserver it runs on port 8080 but has no implemented encryption right now. Theres a [**heartbeat**](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html) algorithm implemented using **Spring-boot actuator** which returns up, when the server is live and the following **URL** has been called:

```
http://localhost:8080/actuator/health
```

### Routes
---
#### **Game innit - BetLocation**
> **POST**  
> **localhost:8000/Pferderennen/Game/innit**

Using an **optional** parameter in the request body it is possible to place bets and generely use the betsystem like it's intendet to. The return type of this route is the **Betlocation** object, which is used for the main game and provides all information about the current game.

#### **Place Bet - BetLocation**
> **POST**  
> **localhost:8080/Pferderennen/Game/Bet**

Using the requestparameters important data like **Username**, **bet ammount** and **Horse name** are provided for the server in order to place the bet for the game. When successfull the return type of the function is the **Betlocaction** represented as a [**JSON**](https://www.oracle.com/de/database/what-is-json/#:~:text=JavaScript%20Object%20Notation%20(JSON)%20ist,da%20keine%20Deserialisierung%20erforderlich%20ist.) object.

#### **Create User - User**
> **POST**  
> **locahost:8080/User/Create**

Using this route, it is possible to create a **User**, save and use then later on to change values. The route checks wether the object already exists in the database or not.

#### **Login User - User**
> **POST**  
> **locahost:8080/User/Login**

Using this route, it is possible for the application to check whether the **User** exists or not. The return type for a successfull Login is the **User** object, which is used later on for the **Bet System** and Listing of all participating **Users**.

#### **Get Active Users - BetLocation**
> **GET**  
> **localhost:8080/Pferderennen/Game/ActiveUsers**
 
Using this route, it is possible to get a **List** of all active **Users** in order to display them inside of the application.

#### **Iterate Gamecycle - BetLocation**
> **GET**  
> **locahost:8080/Pferderennen/Game/iterate**

Using this route, it is possible to iterate to the next game cycle and let the horses run. The return type of this function is the **BetLocation** object.

#### **Get all Users from Database**
> **GET**  
> **localhost:8080/Users/Users**

Using this route, it is possible to gather all database documents from the connected **MongoDB** instance. Return type is a **List** of all saved **Users**.


## **WPF Application**

### **Important Classes**

> - **BetLocation.cs**  
> - **EncryptionHelper.cs**  
> - **Horse.cs**  
> - **HttpClient.cs**  
> - **User.cs**

### **XAML Files**

> - **Mainwindow.xaml**  
> - **Login.xaml**  
> - **Userdialog.xaml**

---
### **BetLocation.cs**

**Membervariables**

```cs
        private string location;
        private Horse[] horses = new Horse[5];
        private float trackLength;
        private bool gameFinished;
        private Horse winner;
        private bool gameStarted;
```

**Calculate Bet Algorithm**
```cs
public async Task<Dictionary<string, float>> CalculateBetResults()
{
    Dictionary<string, float> betResults = new Dictionary<string, float>();

    // Find the winning horse
    Horse? winningHorse = horses.FirstOrDefault(horse => horse.RunDistance > trackLength);

    // Iterate through each horse's bets
    foreach (Horse horse in horses)
    {
        foreach (KeyValuePair<string, float> bet in horse.Bets)
        {
            // Check if the bettor's horse won
            bool betWon = horse == winningHorse;

            // Calculate the result based on the bet
            float result = betWon ? bet.Value : -bet.Value;

            // Update the bet result for the bettor
            if (betResults.ContainsKey(bet.Key))
            {
                betResults[bet.Key] += result;
            }
            else
            {
                betResults[bet.Key] = result;
            }
        }
    }

    return betResults;
}
```
This algorithm finds all bets placed on the horses and calculates which players neither won or lost credits.

---
#### EncryptionHelper TODO: REFACTOR

---
### **Horse.cs**

**Membervariablen**

```cs
        private string name;
        private float speed;
        private Dictionary<string, float> bets;
        private float runDistance;
```
---
### **HttpClient.cs**

**Initialize the game**
```cs
 public async Task<BetLocation?> InitGame(User u)
 {
     try
     {
         HttpResponseMessage response;


         string json = JsonSerializer.Serialize(u);

         if(u != null)
         {
             var stringContent = new StringContent(json, Encoding.UTF8, "application/json");


             response = await _httpClient.PostAsync("Pferderennen/Game/innit", stringContent);

             MessageBox.Show("user existing");
         }
         else
         {
             response = await _httpClient.PostAsync("Pferderennen/Game/innit", null);
         }


         if (response.IsSuccessStatusCode)
         {
             string responseBody = await response.Content.ReadAsStringAsync();

             JsonSerializerOptions options = new JsonSerializerOptions();
             options.PropertyNameCaseInsensitive = false;

             BetLocation? location = await JsonSerializer.DeserializeAsync<BetLocation>(new MemoryStream(Encoding.UTF8.GetBytes(responseBody)), options);

             foreach (Horse h in location.Horses)
             {
                 h.Speed = (float)Math.Round(h.Speed, 3);
             }

             location.TrackLength = (float)Math.Round(location.TrackLength, 4);

             return location;
         }
     
     }catch(Exception ex)
     {
         MessageBox.Show(ex.Message, "InitError!");
     }

     

     return null;
 }
```
Using this function, it is possible to make a [API](#webserver)-call in order to start/receiv the starting object. The **optional** parameter is important for the betting algorithm, so that a list of all participating players can be returned. After reveiving the object some numbers are rounded in order to not make the numbers displayed too long. **User** object will be transmitted over the **request-body**.

---

**Placing bets on a horse**

```cs
public async Task<string> PlaceBet(string betValue, string better, string horseName)
{
    try
    {
        Dictionary<string, string> data = new Dictionary<string, string>()
        {
            {"better", better},
            {"betValue", betValue.ToString() },
            {"horseName", horseName}
        };

        HttpContent item = new FormUrlEncodedContent(data);

        HttpResponseMessage response = await _httpClient.PostAsync("Pferderennen/Game/Bet", item);

        if (response.IsSuccessStatusCode)
        {
            string responseBody = await response.Content.ReadAsStringAsync();

            return responseBody;
        }


    }
    catch (Exception ex)
    {
        MessageBox.Show(ex.Message);
    }


    return "";
}
```
Using this function, it is possible to place a bet via the [API](#webserver). The parameters for this functions are **betValue** that resemble the ammount of credits that will be locked on the horse. **better** is automaticly collected, when logged in to a account.  
**LOGIN IS NESSESECARY!** **horsename** is the name of the horse that has been choosen by the player to bet on. Parameters will be transmitted via. **Requestparameter**.  

---
**Log into the Database**

```cs
public async Task<User?> Login(string username, string password)
{
    string hashedPassword = EncryptionHelper.HashPassword(password);

    string jsonObj = JsonSerializer.Serialize(new { username, password, hashedPassword });

    var content = new StringContent(jsonObj, Encoding.UTF8, "application/json");

    User? u = null;
    
    try
    {

        HttpResponseMessage respones = await _httpClient.PostAsync("User/Login", content);


        if (respones.IsSuccessStatusCode)
        {
            string data = await respones.Content.ReadAsStringAsync();
            u = JsonSerializer.Deserialize<User?>(data);
            MainWindow.user = u;
        }

    }
    catch(JsonException e)
    {
        MessageBox.Show(e.Message);
    }
    catch(Exception e)
    {
        MessageBox.Show(e.Message);
    }

    return u;
}
```
Using this function, it is possible to send a request to the [API](#webserver) that will either let you continue your application or basically stop it completley from working. Parameters are **username**, **password** and **hashedpassword**. 

## Angular Webclient

Utilizing the given functionality of [**Angular**](https://angular.io/) there are some important [**Services**](https://angular.io/tutorial/tour-of-heroes/toh-pt4) that help running the logic of the Webclient.

### Important Services

> - myhttpClient
> - password-hasher

Angular uses [**Components**](https://angular.io/guide/component-overview) to encapsulate the different components of the application.

### Important Components

> - betpage
> - header
> - horse-body
> - not-found
> - sing-up
> - user-login
> - winner

There are some Utility classes that help creating objects and store data in generell.

### Utility Classes

> - BetLocation
> - Gamemanager
> - Horse
> - Redirect
> - User


### myhttpClient

---

**Log in**
```ts
async login(_username: string, password: string): Promise<User | null> {
    const _passwordHashed: string = await this.hasherService.hashPassword(password);
    const _money: number = 0;
    const jsonObj = JSON.stringify({ _username, _money, _passwordHashed });

    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Allow all origins, you can customize this
    });

    try {
      const response = await this.client.post<User>('http://localhost:8080/User/Login', jsonObj, { headers }).toPromise();

      if (!response) {
        console.error("undefined!");
        return null;
      }

      let _id: string = response['id'];
      let _username: string = response['username'];
      let _hashedPassword: string = response['passwordHashed'];
      let _money: number = response['money'];

      let actualuser: User = new User(_id, _username, _money, _hashedPassword);

      GameManager.GetInstance().user = actualuser;

      return actualuser;

    } catch (error) {
      console.error('Error logging in:', error);
      return null;
    }
  }
```

Give this Function the **username** and **password** in order to send a request to the [**API**](#login-user---user) which returns a **User** object when the login credentials match, otherwise a null retuned. The returned object will be set in the [**Singelton**](https://de.wikipedia.org/wiki/Singleton_(Entwurfsmuster)), so that it can be accessed from everywhere.

---
**Sing-up**

```ts
async sign_up(username: string, password: string): Promise<User | null>{

    let hashedPassword: string = await this.hasherService.hashPassword(password);

    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Allow all origins, you can customize this
    });

    let obj: User = new User("", username, 0, hashedPassword);

    let json: string = JSON.stringify(obj);

    console.log(json);

    try{
      const user: User | undefined = await this.client.post<User>('http://localhost:8080/User/Create', json, {headers}).toPromise();

      if(!user){
        console.error("User not found");
        return null;
      }

      let _username: string = user['_username'];
      let _hashedPassword: string = user['_passwordHashed'];
      let _money: number = user['_money'];

      let actualObj: User = new User("", _username, _money, _hashedPassword);

      GameManager.GetInstance().user = actualObj;

      return actualObj;


    }catch (error){
      console.log("Error logging on:", error);
      return null;
    }
  }
```

Give this function the **username** and the **password** and it will create a new **User** in the Database. The Result varies weither there is already an existing User or not. The returntype of this function is weither the User or null. This will be saved in the Singelton as well.

---
**Initiate the Game**

``` ts
async init(): Promise<BetLocation | null>{

    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Allow all origins, you can customize this
    });

    let json: string = JSON.stringify(GameManager.GetInstance().user);

    try{
      const betLocation: BetLocation|undefined = await this.client.post<BetLocation>('http://localhost:8080/Pferderennen/Game/innit', json, {headers}).toPromise();

      if(!betLocation){
        console.error("Error receiving betlocation!");
        return null;
      }

      let actualObject: BetLocation = new BetLocation(
        betLocation.location,
        betLocation.horses,
        betLocation.trackLength,
        betLocation.gameFinished,
        betLocation.winner,
        betLocation.gameStarted
      );

      GameManager.GetInstance().gamelocation = actualObject;

      return actualObject;

    }catch (error){
      console.error('Error loggin in:', error);
      return null;
    }
  }
```

This function does not have any parameters but takes the **User** from the Singelton. It proceeds to make a request to the **API** and gets a [**Betlocation**](#betlocationcs) which will be then stored in the **Singelton**.

---

**Place Bets on different horses**

```ts
async blacePet(h:Horse, betValue: number): Promise<BetLocation | null>{

    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Allow all origins, you can customize this
    });

    if(!GameManager.GetInstance().user || GameManager.GetInstance().user === undefined){
      console.error("User not found");
      return null;
    }

    let better: string = GameManager.GetInstance().user.username;

    if(betValue === undefined){
      console.log("undefined")
      return null;
    }

    console.log("Better:", better);
    let horseName: string = h.name;

    let json: string = JSON.stringify({betValue, better, horseName})

    try{
      const betLocation: BetLocation | undefined = await this.client.post<BetLocation>('http://localhost:8080/Pferderennen/Game/Bet', json, {headers}).toPromise();

      if(!betLocation){
        console.error("Could not find betLocation");
        return null;
      }

      let actualBetLocation: BetLocation = new BetLocation(
        betLocation.location,
        betLocation.horses,
        betLocation.trackLength,
        betLocation.gameFinished,
        betLocation.winner,
        betLocation.gameStarted
      );

      GameManager.GetInstance().gamelocation = actualBetLocation;

      return actualBetLocation;

    }catch (error){
      console.log("Error logging on:", error);
      return null;
    }
  }
``` 
This function takes the chosen **Horse** and the **value** of the **bet**. The function checks if the **User** and the **BetLocation** exist then it proceeds to make the request to the **API** using the collected parameters and sending them in the **requestbody**. If the **horse** does not exist or the **value** is more than the **Users** balance is then it will return null, otherwise the place will be set and the **balance** of the player will be updated in the **database**. The result of the object will then be **deserialized** and then saved to the **GameManager**.

---

**Iterate horserace cycles**

```ts
async iterate(): Promise<BetLocation | null>{

    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Allow all origins, you can customize this
    });

    try{
      const betLocation: BetLocation | undefined = await this.client.get<BetLocation>('http://localhost:8080/Pferderennen/Game/iterate', {headers}).toPromise();

      if(!betLocation){
        console.error("Betlocation null!");
        return null;
      }

      let actualObject: BetLocation = new BetLocation(
        betLocation.location,
        betLocation.horses,
        betLocation.trackLength,
        betLocation.gameFinished,
        betLocation.winner,
        betLocation.gameStarted
      );

      GameManager.GetInstance().gamelocation = actualObject;

      return actualObject;


    }catch (error){
      console.error('Loggin error:',error);
      return null;
    }
  }
```

This function iterates the gamecycles and makes an **API** call to make progress in the horse race. The returning type is a new **BetLocation** object that will be **deserialized** and saved to the **singelton**.

---

### password-hasher service

```ts
public async hashPassword(password: string): Promise<string> {
    let passwordHashed: string = await sha256(password);

    return passwordHashed;
  }
```

It's a simple function that [**hashes**](https://en.wikipedia.org/wiki/SHA-2) a **Password** and returns the corresponding **hashed** string value of that password.

````mermaid
graph TD
    A[Enter Chart Definition] --> B(Preview)
    B --> C{decide}
    C --> D[Keep]
    C --> E[Edit Definition]
    E --> B
    D --> F[Save Image and Code]
    F --> B
```