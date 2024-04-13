# POS Projekt 2024

## Description

This repo provides a spring boot application that connects to a local MongoDB database and provides basic CRUD-Operation.

## Table of Contents 
- [Installation](#installation)
- [Webserver](#webserver)
- [WPF Application](#wpf-application)

# TODO
- [ENCRYPTIONHELPOER](#encryptionhelper-todo-refactor)
- [PASSWORD LOGIN/SING UP](#httpclientcs)

## Installation
Simply download the repository and then fire up [**Intellij**](https://www.jetbrains.com/de-de/idea/) and start the project simply by pressing the button.
For the **Webclient** you may have to use:

```bash
npm install
```

after installing all of the dependencies you have to start the application using

```bash
ng serve
```
**IMPORTANT** to note is that the **Angular CLI** is needed in order for this to work. You can install that dependency with node or at [**Angular**](https://angular.io/cli):

```
npm install -g @angular/cli
```


## Webserver

The webserver uses [**Springboot**](https://start.spring.io) in order to build a webapplication utilizing the CRUD-Repository. Like your average webserver it runs on port 8080 but has no encryption on it.

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

#### **Get Database item by ID**
> **GET**  
> **localhost:8080/Users/{ID}**

Using this route, it is possible to retrieve a single **User** object from the database. This is usefull for finding the participants of the Bet. Return type is a single **User**.

#### **Edit Database item by ID**
> **PUT**  
> **localhost:8080/Users/{ID}**

Using this route, it is possible to change a single **User** object from the database. When successfull the return type of the route will be a **User** object, when a error occurs it will be **null**.

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
### **BetLocaion.cs**

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
Using this function, it is possible to send a request to the [API](#webserver) that will either let you continue your application or basically stop it completley from working. Parameters are **username**, **password** and **hashedpassword**.  WORK