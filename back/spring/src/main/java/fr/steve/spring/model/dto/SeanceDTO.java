package fr.steve.spring.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeanceDTO {

    private String movieId;
    private String startTime;
    private String endTime;
    private int availableSeats;
    private int numberOfSeats;
    private double price;

    public SeanceDTO(String movieId, String startTime, String endTime, int availableSeats, int numberOfSeats, double price) {
        this.movieId = movieId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.availableSeats = availableSeats;
        this.numberOfSeats = numberOfSeats;
        this.price = price;
    }
}
