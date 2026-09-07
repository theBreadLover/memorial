import { NavLink } from 'react-router-dom';

export default function Header() {
	return (
		<header	className="header-container">
			<nav className="header-nav" aria-label="Main navigation">
				<NavLink to="/" end className="nav-link">Home</NavLink>
				<NavLink to="gallery" className="nav-link">Gallery</NavLink>
			</nav>
		</header>
	)
}