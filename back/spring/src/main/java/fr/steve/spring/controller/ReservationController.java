package fr.steve.spring.controller;

import fr.steve.spring.model.Reservation;
import fr.steve.spring.model.User;
import fr.steve.spring.model.dto.ReservationDto;
import fr.steve.spring.service.ReservationService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/booking")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping("/new")
    public void newBooking(ReservationDto reservationDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        Reservation reservation = new Reservation();
        reservation.setBooker(currentUser);
        reservation.setMovieId(reservationDto.getMovieId());
        reservation.setNbPlaces(reservationDto.getNbPlaces());
        reservationService.newReservation(reservation);
    }
}
