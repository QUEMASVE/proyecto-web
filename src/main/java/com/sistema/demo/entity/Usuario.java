package com.sistema.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String email;
    private String telefono;
    private String avatar;
    
    // Nuevos campos para la vista detallada
    private String bio;
    private String comidaFavorita;
    private String pasatiempos;

    // Constructores por defecto
    public Usuario() {}

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getComidaFavorita() { return comidaFavorita; }
    public void setComidaFavorita(String comidaFavorita) { this.comidaFavorita = comidaFavorita; }

    public String getPasatiempos() { return pasatiempos; }
    public void setPasatiempos(String pasatiempos) { this.pasatiempos = pasatiempos; }
}