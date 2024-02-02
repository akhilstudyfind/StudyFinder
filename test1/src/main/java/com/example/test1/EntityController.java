package com.example.test1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/entities")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class EntityController {
    private final EntityRepository entityRepository;

    @Autowired
    public EntityController(EntityRepository entityRepository) {
        this.entityRepository = entityRepository;
    }

    @GetMapping
    public List<Entity> getAllEntities() {
        return entityRepository.findAll();
    }

    @PostMapping
    public void addEntity(@RequestBody Entity newEntity) {
        entityRepository.save(newEntity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Entity> updateEntity(@PathVariable String id, @RequestBody Entity updatedEntity) {
        Optional<Entity> optionalEntity = entityRepository.findById(id);

        if (optionalEntity.isPresent()) {
            Entity existingEntity = optionalEntity.get();
            existingEntity.setTitle(updatedEntity.getTitle());
            existingEntity.setStudyStatus(updatedEntity.getStudyStatus());
            existingEntity.setDescription(updatedEntity.getDescription());

            entityRepository.save(existingEntity);
            return ResponseEntity.ok(existingEntity);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public void deleteEntity(@PathVariable String id) {
        entityRepository.deleteById(id);
    }
}
