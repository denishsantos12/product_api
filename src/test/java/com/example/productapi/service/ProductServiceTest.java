package com.example.productapi.service;

import com.example.productapi.model.dto.ProductDTO;
import com.example.productapi.model.entity.Product;
import com.example.productapi.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void shouldCreateProduct() {
        ProductDTO dto = new ProductDTO();
        dto.setName("Test Product");
        dto.setDescription("Test Description");
        dto.setPrice(10.0);
        dto.setStockQuantity(100);

        Product product = dto.toEntity();
        product.setId(1L);

        when(productRepository.save(any(Product.class))).thenReturn(product);

        ProductDTO created = productService.createProduct(dto);
        
        assertThat(created.getId()).isEqualTo(1L);
        assertThat(created.getName()).isEqualTo("Test Product");
    }

    @Test
    void shouldThrowExceptionWhenProductNotFound() {
        when(productRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> {
            productService.getProductById(1L);
        });
    }
}