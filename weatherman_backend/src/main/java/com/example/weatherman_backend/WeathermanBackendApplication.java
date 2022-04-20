package com.example.weatherman_backend;

import com.example.weatherman_backend.model.Weather;
import com.example.weatherman_backend.service.WeatherService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class WeathermanBackendApplication {


    public static void main(String[] args) {
        SpringApplication.run(WeathermanBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner run (WeatherService weatherService) {
        return args -> {

            Weather example = new Weather(null, "21-03-2022", "Ukraine", "Kazakhstan", 23.4F, 20F, 24F, 25F, 19.8F, 20F);
            List<Weather> testList = Arrays.asList(example);
            weatherService.saveWeatherData(testList);
        };
    }

}
