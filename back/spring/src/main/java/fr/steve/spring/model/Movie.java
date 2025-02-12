package fr.steve.spring.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Movie {

    private String id;
    private String title;
    private String genre;
    private int duration;
}
