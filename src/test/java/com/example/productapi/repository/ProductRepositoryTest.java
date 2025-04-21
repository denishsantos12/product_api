package com.example.productapi.repository;

import com.example.productapi.model.entity.Product;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class ProductRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ProductRepository productRepository;

    @Test
    void shouldSaveProduct() {
        Product product = new Product();
        product.setName("Test Product");
        product.setDescription("Test Description");
        product.setPrice(10.0);
        product.setStockQuantity(100);

        Product savedProduct = productRepository.save(product);
        
        assertThat(savedProduct.getId()).isNotNull();
        assertThat(savedProduct.getName()).isEqualTo("Test Product");
    }

    @Test
    void shouldFindProductById() {
        Product product = new Product();
        product.setName("Test Product");
        product.setDescription("Test Description");
        product.setPrice(10.0);
        product.setStockQuantity(100);

        Product savedProduct = entityManager.persist(product);
        entityManager.flush();

        Product found = productRepository.findById(savedProduct.getId()).orElse(null);
        
        assertThat(found).isNotNull();
        assertThat(found.getName()).isEqualTo(product.getName());
    }
}