import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, Table, TableBody, TableCell, TableHead, TableRow, 
    Button, Typography, Box, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, AppBar, Toolbar
} from '@mui/material';
import api from '../services/api';

function Products() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        stockQuantity: ''
    });
    const [editOpen, setEditOpen] = useState(false);
    const [editProduct, setEditProduct] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        stockQuantity: ''
    });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error loading products:', error);
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setNewProduct({ name: '', description: '', price: '', stockQuantity: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateProduct = async () => {
        try {
            await api.post('/products', {
                ...newProduct,
                price: parseFloat(newProduct.price),
                stockQuantity: parseInt(newProduct.stockQuantity)
            });
            handleClose();
            loadProducts();
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('credentials');
        navigate('/login');
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await api.delete(`/products/${productId}`);
            loadProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEditOpen = (product) => {
        setEditProduct({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stockQuantity: product.stockQuantity
        });
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
        setEditProduct({ id: '', name: '', description: '', price: '', stockQuantity: '' });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateProduct = async () => {
        try {
            await api.put(`/products/${editProduct.id}`, {
                ...editProduct,
                price: parseFloat(editProduct.price),
                stockQuantity: parseInt(editProduct.stockQuantity)
            });
            handleEditClose();
            loadProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6">Product Management System</Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Box sx={{ mt: 4, mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h4" component="h1">
                            Products
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleOpen}>
                            Add Product
                        </Button>
                    </Box>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>{product.stockQuantity}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            sx={{ mr: 1 }}
                                            onClick={() => handleEditOpen(product)}
                                        >
                                            Edit
                                        </Button>
                                        <Button 
                                            variant="contained" 
                                            color="error"
                                            onClick={() => handleDeleteProduct(product.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Create New Product</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            label="Product Name"
                            type="text"
                            fullWidth
                            value={newProduct.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            value={newProduct.description}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="price"
                            label="Price"
                            type="number"
                            fullWidth
                            value={newProduct.price}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="stockQuantity"
                            label="Stock Quantity"
                            type="number"
                            fullWidth
                            value={newProduct.stockQuantity}
                            onChange={handleInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleCreateProduct} variant="contained" color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={editOpen} onClose={handleEditClose}>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            label="Product Name"
                            type="text"
                            fullWidth
                            value={editProduct.name}
                            onChange={handleEditInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            value={editProduct.description}
                            onChange={handleEditInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="price"
                            label="Price"
                            type="number"
                            fullWidth
                            value={editProduct.price}
                            onChange={handleEditInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="stockQuantity"
                            label="Stock Quantity"
                            type="number"
                            fullWidth
                            value={editProduct.stockQuantity}
                            onChange={handleEditInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditClose}>Cancel</Button>
                        <Button onClick={handleUpdateProduct} variant="contained" color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
}

export default Products;