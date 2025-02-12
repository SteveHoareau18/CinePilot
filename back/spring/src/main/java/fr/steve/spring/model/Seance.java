package fr.steve.spring.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Seance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String movieId;
    private String startTime;
    private String endTime;
    private int availableSeats;
    private int numberOfSeats;
    private double price;

}
