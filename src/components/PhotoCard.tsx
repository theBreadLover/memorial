type props = {
	imgSrc: string,
	caption: string,
}

export default function PhotoCard({imgSrc, caption}: props) {
	return (
		<>
			<figure className="section-image">
				<img src={imgSrc}
				     alt={caption}
				     className="card-img"/>
				<figcaption className="img-caption">{caption}</figcaption>
			</figure>
		</>
	)
}