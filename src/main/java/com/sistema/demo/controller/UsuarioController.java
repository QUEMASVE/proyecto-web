package com.sistema.demo.controller;

import com.sistema.demo.entity.Usuario;
import com.sistema.demo.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*") // Permite que el frontend se comunique con este backend sin problemas de seguridad CORS
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // 1. GET: Obtener la lista de todos los usuarios
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioService.obtenerTodos();
    }

    // 2. GET: Buscar un usuario específico por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuarioPorId(@PathVariable Long id) {
        return usuarioService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 3. POST: Crear un nuevo usuario en la base de datos
    @PostMapping
    public Usuario guardarUsuario(@RequestBody Usuario usuario) {
        return usuarioService.guardarUsuario(usuario);
    }

    // 4. PUT: Actualizar un usuario existente
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioDetalles) {
        return usuarioService.obtenerPorId(id)
                .map(usuarioExistente -> {
                    usuarioExistente.setNombre(usuarioDetalles.getNombre());
                    usuarioExistente.setEmail(usuarioDetalles.getEmail());
                    usuarioExistente.setAvatar(usuarioDetalles.getAvatar());
                    usuarioExistente.setTelefono(usuarioDetalles.getTelefono());
                    Usuario actualizado = usuarioService.guardarUsuario(usuarioExistente);
                    return ResponseEntity.ok(actualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 5. DELETE: Eliminar un usuario por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        if (usuarioService.obtenerPorId(id).isPresent()) {
            usuarioService.eliminarUsuario(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}