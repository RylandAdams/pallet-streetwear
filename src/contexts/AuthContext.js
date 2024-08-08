// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Check if there's a stored token and validate it
		const checkAuth = async () => {
			const token = localStorage.getItem('authToken');
			if (token) {
				try {
					const userData = await authService.validateToken(token);
					setUser(userData);
				} catch (error) {
					console.error('Invalid token', error);
					localStorage.removeItem('authToken');
				}
			}
			setLoading(false);
		};

		checkAuth();
	}, []);

	const login = async (email, password) => {
		try {
			const { user, token } = await authService.login(email, password);
			localStorage.setItem('authToken', token);
			setUser(user);
			return user;
		} catch (error) {
			console.error('Login failed', error);
			throw error;
		}
	};

	const signup = async (email, password, preferences) => {
		try {
			const { user, token } = await authService.signup(
				email,
				password,
				preferences
			);
			localStorage.setItem('authToken', token);
			setUser(user);
			return user;
		} catch (error) {
			console.error('Signup failed', error);
			throw error;
		}
	};

	const logout = () => {
		localStorage.removeItem('authToken');
		setUser(null);
	};

	const updatePreferences = async (preferences) => {
		try {
			const updatedUser = await authService.updatePreferences(
				user.id,
				preferences
			);
			setUser(updatedUser);
			return updatedUser;
		} catch (error) {
			console.error('Failed to update preferences', error);
			throw error;
		}
	};

	const value = {
		user,
		login,
		signup,
		logout,
		updatePreferences,
		loading,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
