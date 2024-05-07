package at.htlsaalfelden.main.dtos;

public record BetDTO(float betValue, String better, String horseName) {


    public BetDTO(BetDTO o){
        this(o.betValue, o.better, o.horseName);
    }
}