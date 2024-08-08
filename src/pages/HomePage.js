import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useShopify } from '../hooks/useShopify';
import ProductCard from '../components/ProductCard';
import OutfitSelector from '../components/OutfitSelector';
import Layout from '../components/layout/Layout';

const HomePage = () => {
	const { user } = useAuth();
	const { fetchFeaturedProducts } = useShopify();
	const [featuredProducts, setFeaturedProducts] = useState([]);

	useEffect(() => {
		const loadFeaturedProducts = async () => {
			const products = await fetchFeaturedProducts();
			setFeaturedProducts(products);
		};

		loadFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<Layout>
			<main className='home-page'>
				<section className='hero'>
					<h1>Welcome to StreetWear Shop</h1>
					<p>
						Discover your unique style with our curated collection
					</p>
					{!user && (
						<Link
							to='/account'
							className='cta-button'
						>
							Create Account
						</Link>
					)}
				</section>

				{!user && (
					<section className='taste-selector'>
						<h2>Find Your Style</h2>
						<OutfitSelector />
					</section>
				)}

				<section className='featured-products'>
					<h2>Featured Products</h2>
					<div className='product-grid'>
						{featuredProducts.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
							/>
						))}
					</div>
				</section>

				<section className='cta-sections'>
					<div className='cta-box'>
						<h3>Curated For You</h3>
						<p>Discover items tailored to your taste</p>
						<Link
							to='/curated'
							className='cta-link'
						>
							Explore Curated
						</Link>
					</div>
					<div className='cta-box'>
						<h3>Full Inventory</h3>
						<p>Browse our complete collection</p>
						<Link
							to='/inventory'
							className='cta-link'
						>
							View Inventory
						</Link>
					</div>
				</section>
			</main>
		</Layout>
	);
};

export default HomePage;
