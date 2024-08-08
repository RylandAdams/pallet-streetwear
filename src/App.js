import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CuratedPage from './pages/CuratedPage';
import InventoryPage from './pages/InventoryPage';
import AccountPage from './pages/AccountPage';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { PreferencesProvider } from './contexts/PreferencesContext';

function App() {
	return (
		<Router>
			<AuthProvider>
				<CartProvider>
					<PreferencesProvider>
						<Routes>
							<Route
								path='/'
								element={<HomePage />}
							/>
							<Route
								path='/curated'
								element={<CuratedPage />}
							/>
							<Route
								path='/inventory'
								element={<InventoryPage />}
							/>
							<Route
								path='/account'
								element={<AccountPage />}
							/>
						</Routes>
					</PreferencesProvider>
				</CartProvider>
			</AuthProvider>
		</Router>
	);
}

export default App;
