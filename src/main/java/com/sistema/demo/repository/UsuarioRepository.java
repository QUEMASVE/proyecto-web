package com.sistema.demo.repository;

import com.sistema.demo.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Aquí podremos agregar consultas personalizadas más adelante si las necesitamos (como buscar por nombre)
}