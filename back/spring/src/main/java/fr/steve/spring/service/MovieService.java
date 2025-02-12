package fr.steve.spring.service;

import fr.steve.spring.model.Movie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.stereotype.Service;

@Service
public class MovieService {

    @Value("${movie.api.url}")  // URL of the PHP backend API
    private String movieApiUrl;

    private final RestTemplate restTemplate;

    public MovieService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    // Fetch movie details by ID from PHP backend
    public Movie fetchMovieById(String movieId) {
        String url = movieApiUrl + "/movies/" + movieId;  // Assuming your PHP backend exposes this route
        ResponseEntity<Movie> response = restTemplate.getForEntity(url, Movie.class);
        return response.getBody();
    }
}
