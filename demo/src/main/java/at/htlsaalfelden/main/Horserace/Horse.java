package at.htlsaalfelden.main.Horserace;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;

public class Horse {
    private String names[] = {"Thunderhoof", "Shadowrunner", "Starlight Gallop", "Midnight Mirage", "Silver Mane"};
    private String name;
    private float speed;
    private HashMap<String, Float> bets = new HashMap<>();
    private float runDistance = 0;
    private Random random = new Random();

    public Horse(){
        this.name = names[random.nextInt(5)];
        this.speed = 50 + random.nextFloat(10);
    }

    @Override
    public String toString(){
        return "Name: " + this.name + " speed: "+ this.speed + " bets: " + this.bets.size();
    }

    public String getName(){
        return this.name;
    }

    public void setName(String newName){
        this.name = newName;
    }

    public float getSpeed(){
        return this.speed;
    }

    public void addBet(float f, String better){
        this.bets.put(better, f);
    }

    public HashMap<String, Float> getBets(){
        return this.bets;
    }

    public float getRunDistance(){
        return  this.runDistance;
    }


    public void addRunDistance(float f){
        this.runDistance += f;
    }
}