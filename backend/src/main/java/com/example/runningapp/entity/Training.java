package com.example.runningapp.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.sql.Time;

@Entity
@Table
@Getter
@Setter
public class Training {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "kilometers")
    private double kilometers;

    @Column(name = "time")
    private Time time;

    @Column(name = "calories")
    private int calories;

    @Column(name = "description")
    private String description;

    @Column(name = "date_created")
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Date dateCreated;

    @Column(name = "last_updated")
    @UpdateTimestamp
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Date lastUpdated;
}
