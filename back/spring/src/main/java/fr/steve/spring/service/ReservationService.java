package fr.steve.spring.service;

import fr.steve.spring.model.Reservation;
import fr.steve.spring.model.repository.ReservationRepository;
import fr.steve.spring.model.response.UserResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public ReservationService(ReservationRepository reservationRepository){
        this.reservationRepository = reservationRepository;
    }

    public Reservation newReservation(Reservation reservation){
        reservationRepository.save(reservation);
        return reservation;
    }

    public List<Reservation> findAll(){
        List<Reservation> reservations = new ArrayList<>();

        reservationRepository.findAll().forEach(reservations::add);

        return reservations;
    }
}
