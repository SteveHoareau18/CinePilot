package fr.steve.spring.service;

import fr.steve.spring.model.Seance;
import fr.steve.spring.model.repository.SeanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeanceService {
    private final SeanceRepository seanceRepository;

    public SeanceService(SeanceRepository seanceRepository) {
        this.seanceRepository = seanceRepository;
    }

    // Fetch all seances for a specific movie by movieId
    public List<Seance> getSeancesByMovieId(Long movieId) {
        return seanceRepository.findByMovieId(movieId);
    }

    public void saveSeance(Seance seance) {
        seanceRepository.save(seance);
    }

}
