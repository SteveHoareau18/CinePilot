package fr.steve.spring.model.repository;

import fr.steve.spring.model.Seance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeanceRepository extends JpaRepository<Seance, Long> {
    // Find all seances for a given movie ID
    List<Seance> findByMovieId(Long movieId);
}
