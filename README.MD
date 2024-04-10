# POS Projekt 2024

## Description

This repo provides a spring boot application that connects to a local MongoDB database and provides basic CRUD-Operation.

## Table of Contents 
- [Installation](#installation)
- [Webserver](#webserver)
- [WPF Application](#wpf-application)



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

## WPF Application

TODO: 