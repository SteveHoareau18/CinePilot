package fr.steve.spring.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReservationDto {

    private Long movieId;
    private int nbPlaces;

}
