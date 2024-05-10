package at.htlsaalfelden.main.Controller;

import at.htlsaalfelden.main.Horserace.BetLocation;
import at.htlsaalfelden.main.dtos.BetDTO;
import at.htlsaalfelden.main.dtos.UserDTO;
import at.htlsaalfelden.main.models.Usermodel;
import at.htlsaalfelden.main.services.ActualUserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController	// This means that this class is a Controller
@RequestMapping(path="/Pferderennen") // This means URL's start with /demo (after Application path)
@CrossOrigin(origins="http://localhost:4200")
public class MainController {

    private static final Logger LOGGER = LoggerFactory.getLogger(MainController.class);

    private final ActualUserService actualUserService;
    private BetLocation location;
    private final ObjectMapper mapper = new ObjectMapper();

    @Autowired
    public MainController(ActualUserService actualUserService){
        this.actualUserService = actualUserService;
    }

    @PostMapping("/Game/innit")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody String getGame(@RequestBody (required = false) UserDTO entity) throws JsonProcessingException {
        if(location == null){
            location = new BetLocation();
        }

        try {
            if(entity.get_username() != null){
                LOGGER.info("[MAINCONTROLLER]\t\t"+mapper.writeValueAsString(entity));
                location.addToActiveUserList(entity);
            }


        }
        catch(Exception e){
            LOGGER.error(e.getMessage());
        }


        if(location.isGameFinished()){
            location = new BetLocation();
        }

        return mapper.writeValueAsString(location);
    }

    @PostMapping("/Game/Bet")
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody String placeBet(@RequestBody BetDTO dto) throws JsonProcessingException {

        if(location == null){
            return "Game has not been initialized";
        }

        try{
            List<Usermodel> list = actualUserService.findAll();

            for(int i = 0; i < list.size(); i++){
                if(Objects.equals(list.get(i).getUsername(), dto.better())){

                    Usermodel newObj = new UserDTO(list.get(i).getUsername(), (int) (list.get(i).getMoney() - dto.betValue()), list.get(i).getPasswordHashed()).ToUsermodel();

                    Usermodel result = actualUserService.updateFirst(newObj);

                    return location.placeBet(dto.betValue(), dto.horseName(), dto.better());
                }
            }

        }catch (NullPointerException ex){
            LOGGER.error("ERROR: " + ex.getMessage());
        }


        return "empty";
    }

    @GetMapping("/Game/ActiveUsers")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody String getActiveUsers() throws JsonProcessingException {
        if(location == null){
            return null;
        }

        return mapper.writeValueAsString(location.getActiveUsers());
    }


    //OAUTH2
    @GetMapping("/Game/iterate")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody String singleIteration() throws JsonProcessingException {

        if(location == null){
            return "Error!";
        }

        location.singleIteration();

        return mapper.writeValueAsString(location);
    }


    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }
}