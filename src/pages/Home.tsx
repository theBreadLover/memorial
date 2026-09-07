import PhotoCard from "../components/PhotoCard.tsx";
import images from "../utils/images.ts";

export default function Home() {

	return (
		<article className="article-container">
			<section className="article-section Banner">
				<h1 className="banner-title">
					<span className="title-text">In Memory Of</span>
					<img className="banner-image" alt="and" src={images[1].src} />
					<span className="title-text">Edwin Hernandez</span>
					<span className="title-caption">Who left this world on 10/17/2025.</span>
				</h1>
			</section>

			<div className="article-separator article-quote">"Lorem ipsum dolor sit amet, consectetur adipisicing."</div>

			<section className="article-section introduction">

				<p className="article-text">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam eaque illo iure nulla numquam officia quia recusandae repudiandae similique voluptatibus!
				</p>
				<aside className="section-aside_content aside-left_side">
					<PhotoCard imgSrc={images[3].src} caption={images[3].src} />
				</aside>
				<p className="article-text">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, rerum.
				</p>
			</section>

			<div className="section-separator article-quote">"Lorem ipsum dolor sit amet."</div>

			<section className="article-section short-story">
				<p className="article-text">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor maxime pariatur temporibus?
				</p>
				<aside className="section-aside_content aside-right_side">
					<PhotoCard imgSrc={images[2].src} caption={images[2].quote} />
				</aside>
				<p className="article-text">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi consequuntur maxime nobis, officia quam quidem voluptatem!
				</p>
			</section>
		</article>
	)
}