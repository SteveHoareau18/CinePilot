package fr.steve.spring.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Table(name="booking")
@Entity
@Getter
@Setter
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long movieId;

    @ManyToOne(optional = false, targetEntity = User.class,fetch = FetchType.LAZY)
    private User booker;

    private int nbPlaces;
}
