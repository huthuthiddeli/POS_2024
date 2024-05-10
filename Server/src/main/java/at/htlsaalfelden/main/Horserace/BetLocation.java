package at.htlsaalfelden.main.Horserace;

import at.htlsaalfelden.main.dtos.UserDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.util.ArrayList;
import java.util.Random;

@Getter
public class BetLocation {
    private String[] locations = {"Kentuky", "New York", "Arkanas"};
    private Horse horses[] = new Horse[5];
    private String location;
    private float trackLength;
    private boolean gameStared = false;
    private boolean gameFinished = false;
    private ArrayList<UserDTO> activeUsers;
    private final Random random = new Random();
    private final ObjectMapper mapper = new ObjectMapper();
    private final static Logger LOGGER = LoggerFactory.getLogger(BetLocation.class);


    public BetLocation(){
        activeUsers = new ArrayList<>();


        //SET LOCATION OF GAME AND DISTANCE
        this.location = locations[random.nextInt(this.locations.length)];
        this.trackLength = 400 + random.nextFloat(500);

        NameHorses();
    }


    //GENERATE NON DUPLICATE HORSE NAMES
    public void NameHorses(){
        ArrayList<String> names = new ArrayList<>();
        try {
            // Create a File object
            File file = new File("./src/main/java/at/htlsaalfelden/main/Horserace/names.txt");

            // Create a FileReader to read the file
            FileReader fileReader = new FileReader(file);

            // Create a BufferedReader to read lines efficiently
            BufferedReader bufferedReader = new BufferedReader(fileReader);

            // Read each line from the file
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                names.add(line);
            }

            // Close the BufferedReader and FileReader
            bufferedReader.close();
            fileReader.close();
        } catch (IOException e) {
            // Handle IO exception
            e.printStackTrace();
        }

        ArrayList<String> savedNames = new ArrayList<>();

        for(int i = 0; i < 5; i++){
            int randNumb = random.nextInt(names.size());
            String name = names.get(randNumb);

            while(savedNames.contains(name)){
                randNumb = random.nextInt(names.size());
                name = names.get(randNumb);
            }

            Horse h = new Horse();

            h.setName(name);

            horses[i] = h;
        }
    }

    public String placeBet(float h, String horseNmae, String better) throws JsonProcessingException {
        LOGGER.info("Value: " + h + " horseName: " + horseNmae + " better:" + better);
        for(int i = 0; i < this.horses.length; i++){
            if(this.horses[i].getName().equals(horseNmae)){
                this.horses[i].addBet(h, better);
                return mapper.writeValueAsString(this);
            }
        }

        return "There was no such horse like this";
    }

    public String getBets(String horseName){
        if(gameStared){
            return "Game has already started no bets";
        }
        for(int i = 0; i < horses.length; i++){
            if(horses[i].getName().equals(horseName)){
                return horses[i].getBets().toString();
            }
        }

        return "No bets have been found!";
    }

    public boolean singleIteration(){
        gameStared = true;

        for(int i = 0; i < this.horses.length; i++){
            //LET HORSES RUN DISTANCE BASED ON THEIR SPEED BUT WITH RANDOMNESS
            float runDistance = (random.nextFloat(1) + 1) * horses[i].getSpeed();
            horses[i].addRunDistance(runDistance);

            if(horses[i].getRunDistance() >= this.trackLength){
                gameFinished = true;
                return true;
            }
        }

        return false;
    }

    public Horse getWinner(){
        if(gameFinished){
            for (int i = 0; i < horses.length; i++) {
                if(horses[i].getRunDistance() >= trackLength){
                    return horses[i];
                }
            }
        }
        return null;
    }

    public boolean isGameStarted(){
        return this.gameStared;
    }


    public void addToActiveUserList(UserDTO e){
        for(UserDTO item : activeUsers){
            if(item.equals(e)){
                return;
            }
        }

        this.activeUsers.add(e);
    }
    public BetLocation setActiveUsers(ArrayList<UserDTO> entities){
        this.activeUsers = entities;
        return this;
    }
}
