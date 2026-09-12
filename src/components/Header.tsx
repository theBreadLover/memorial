import { NavLink } from 'react-router-dom';

export default function Header() {
	return (
		<header className="sticky top-0 my-2 bg-white/10 backdrop-blur-md w-full">
			<nav className="pt-1 pr-5 flex justify-end" aria-label="Main navigation">
				<NavLink to="/" end className="nav-link">Home</NavLink>
				<NavLink to="gallery" className="nav-link">Gallery</NavLink>
			</nav>
		</header>

	)
}