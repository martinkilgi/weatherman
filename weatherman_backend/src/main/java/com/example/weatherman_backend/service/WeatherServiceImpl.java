package com.example.weatherman_backend.service;

import com.example.weatherman_backend.model.Weather;
import com.example.weatherman_backend.repository.WeatherRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j

public class WeatherServiceImpl implements WeatherService {

    private final WeatherRepository weatherRepository;

    @Override
    public List<Weather> getData() {
        return weatherRepository.findAll();
    }
}
