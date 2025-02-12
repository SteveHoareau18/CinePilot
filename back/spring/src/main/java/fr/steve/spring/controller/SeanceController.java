package fr.steve.spring.controller;

import fr.steve.spring.model.Movie;
import fr.steve.spring.model.Seance;
import fr.steve.spring.model.dto.SeanceDTO;
import fr.steve.spring.service.MovieService;
import fr.steve.spring.service.SeanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/seances")
public class SeanceController {

    private final SeanceService seanceService;
    private final MovieService movieService;

    public SeanceController(SeanceService seanceService, MovieService movieService) {
        this.seanceService = seanceService;
        this.movieService = movieService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<String> createSeance(@RequestBody SeanceDTO seanceDTO) {
        var movie = movieService.fetchMovieById(seanceDTO.getMovieId());

        if (movie == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Seance seance = new Seance();
        seance.setMovieId(seanceDTO.getMovieId());
        seance.setStartTime(seanceDTO.getStartTime());
        seance.setEndTime(seanceDTO.getEndTime());
        seance.setAvailableSeats(seanceDTO.getAvailableSeats());
        seance.setNumberOfSeats(seanceDTO.getNumberOfSeats());
        seance.setPrice(seanceDTO.getPrice());

         seanceService.saveSeance(seance);



        return ResponseEntity.ok("200");
    }

    /*// Update an existing Seance
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/update/{seanceId}")
    public ResponseEntity<SeanceDTO> updateSeance(@PathVariable Long seanceId, @RequestBody SeanceDTO seanceDTO) {
        // Check if the seance exists
        Seance existingSeance = seanceService.getSeanceById(seanceId);
        if (existingSeance == null) {
            return ResponseEntity.notFound().build(); // Return 404 if the seance does not exist
        }

        // Update the existing Seance with new values
        existingSeance.setMovieId(seanceDTO.getMovieId());
        existingSeance.setStartTime(seanceDTO.getStartTime());
        existingSeance.setEndTime(seanceDTO.getEndTime());
        existingSeance.setAvailableSeats(seanceDTO.getAvailableSeats());
        existingSeance.setNumberOfSeats(seanceDTO.getNumberOfSeats());
        existingSeance.setPrice(seanceDTO.getPrice());

        // Save the updated Seance
        Seance updatedSeance = seanceService.saveSeance(existingSeance);


    }*/

    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<SeanceDTO>> getAvailableSeances(@PathVariable Long movieId) {
        List<Seance> seances = seanceService.getSeancesByMovieId(movieId);
        List<SeanceDTO> seanceDTOs = seances.stream()
                .map(seance -> new SeanceDTO(
                        seance.getMovieId(),
                        seance.getStartTime(),
                        seance.getEndTime(),
                        seance.getAvailableSeats(),
                        seance.getNumberOfSeats(),
                        seance.getPrice()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(seanceDTOs);
    }
}
