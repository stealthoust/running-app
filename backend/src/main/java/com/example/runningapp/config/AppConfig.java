package com.example.runningapp.config;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class AppConfig implements WebMvcConfigurer, RepositoryRestConfigurer {

    @Value("${spring.data.rest.base-path}")
    private String basePath;
    @Value("${allowed.origins}")
    private String[] allowedOrigins;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping(basePath+"/**").allowedOrigins(allowedOrigins);
    }


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        exposeIds(config);
    }

    private void exposeIds(RepositoryRestConfiguration configuration) {
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
        List<Class> entityClasses = new ArrayList<>();
        for (EntityType entityType : entities) {
            entityClasses.add(entityType.getJavaType());
            Class[] domainType = entityClasses.toArray(new Class[0]);
            configuration.exposeIdsFor(domainType);
        }
    }
}
