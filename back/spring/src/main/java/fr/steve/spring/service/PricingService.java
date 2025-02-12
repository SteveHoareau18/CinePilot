package fr.steve.spring.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PricingService {

    private static final double BASE_PRICE = 15.00;

    private static final double STUDENT_DISCOUNT = 0.5;   // 50% off for students
    private static final double UNEMPLOYED_DISCOUNT = 0.3; // 30% off for unemployed
    private static final double WORKER_DISCOUNT = 0.2;     // 20% off for workers

    // Method to calculate the price based on the user's role
    public double calculatePrice(Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            return BASE_PRICE; // Default price if no user is authenticated
        }

        // Extract the roles from the authorities
        List<SimpleGrantedAuthority> authorities =
                (List<SimpleGrantedAuthority>) authentication.getAuthorities();

        for (SimpleGrantedAuthority authority : authorities) {
            String roleName = authority.getAuthority();

            switch (roleName) {
                case "ROLE_STUDENT":
                    return BASE_PRICE * (1 - STUDENT_DISCOUNT);
                case "ROLE_UNEMPLOYED":
                    return BASE_PRICE * (1 - UNEMPLOYED_DISCOUNT);
                case "ROLE_WORKER":
                    return BASE_PRICE * (1 - WORKER_DISCOUNT);
            }
        }

        return BASE_PRICE;
    }
}
