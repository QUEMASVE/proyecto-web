package com.sistema.demo.controller;

import com.sistema.demo.entity.Usuario;
import com.sistema.demo.service.UsuarioService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UsuarioController.class)
class UsuarioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UsuarioService usuarioService;

    @Test
    void listarUsuarios_deberiaDevolverListaDeUsuarios() throws Exception {

        // Given (Dado): Preparar datos de prueba
        Usuario usuario1 = new Usuario();
        usuario1.setId(1L);
        usuario1.setNombre("Marcos");
        usuario1.setEmail("marcos@test.com");

        Usuario usuario2 = new Usuario();
        usuario2.setId(2L);
        usuario2.setNombre("Ana");
        usuario2.setEmail("ana@test.com");

        List<Usuario> usuarios = Arrays.asList(usuario1, usuario2);

        // Simular que el servicio devuelve estos usuarios
        when(usuarioService.obtenerTodos()).thenReturn(usuarios);

        // When (Cuando) + Then (Entonces): Hacer la petición y verificar el resultado
        mockMvc.perform(get("/api/usuarios"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].nombre").value("Marcos"))
                .andExpect(jsonPath("$[1].nombre").value("Ana"));
    }
}
