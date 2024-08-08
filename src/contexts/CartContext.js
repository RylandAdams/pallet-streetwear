// src/contexts/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { shopifyService } from '../services/shopifyService';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		// Load cart from local storage on initial render
		const savedCart = localStorage.getItem('cart');
		if (savedCart) {
			setCart(JSON.parse(savedCart));
		}
	}, []);

	useEffect(() => {
		// Update total whenever cart changes
		const newTotal = cart.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);
		setTotal(newTotal);

		// Save cart to local storage
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const addToCart = async (productId, quantity = 1) => {
		try {
			const product = await shopifyService.getProduct(productId);
			const existingItem = cart.find((item) => item.id === productId);

			if (existingItem) {
				setCart(
					cart.map((item) =>
						item.id === productId
							? { ...item, quantity: item.quantity + quantity }
							: item
					)
				);
			} else {
				setCart([...cart, { ...product, quantity }]);
			}
		} catch (error) {
			console.error('Failed to add item to cart', error);
			throw error;
		}
	};

	const removeFromCart = (productId) => {
		setCart(cart.filter((item) => item.id !== productId));
	};

	const updateQuantity = (productId, quantity) => {
		if (quantity > 0) {
			setCart(
				cart.map((item) =>
					item.id === productId ? { ...item, quantity } : item
				)
			);
		} else {
			removeFromCart(productId);
		}
	};

	const clearCart = () => {
		setCart([]);
	};

	const checkout = async () => {
		try {
			const checkoutData = await shopifyService.createCheckout(cart);
			// Handle the checkout process, possibly redirecting to Shopify's checkout page
			clearCart();
			return checkoutData;
		} catch (error) {
			console.error('Checkout failed', error);
			throw error;
		}
	};

	const value = {
		cart,
		total,
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart,
		checkout,
	};

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
};
