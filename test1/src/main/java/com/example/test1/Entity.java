package com.example.test1;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "collection3")
public class Entity {
    @Id
    private String id;

    private String title;
    private String studyStatus;
    private String description;

    // Constructors
    public Entity() {
        // Default constructor
    }

    public Entity(String title, String studyStatus, String description) {
        this.title = title;
        this.studyStatus = studyStatus;
        this.description = description;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStudyStatus() {
        return studyStatus;
    }

    public void setStudyStatus(String studyStatus) {
        this.studyStatus = studyStatus;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
