package com.sistema.demo.service;

import com.sistema.demo.entity.Usuario;
import com.sistema.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Obtener todos los usuarios registrados
    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    // Buscar un usuario por su ID
    public Optional<Usuario> obtenerPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    // Guardar un nuevo usuario o actualizar uno existente
    public Usuario guardarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Eliminar un usuario por su ID
    public void eliminarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }
}