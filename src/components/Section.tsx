type properties = {
	title: string,
	text: string
}

export default function Section({title, text}: properties) {
	const separatedText: string[] = text.trim().split("\n");

	return (
		<>
			<section className="section-container" aria-label={`${title} section`}>
				<h2 className="section-title">{title}</h2>
				{separatedText.map((paragraph: string, index: number)=> {
					return (
						<p key={index} className="leading-relaxed text-gray-700">{paragraph.trim()}</p>
					)
				})}
			</section>
		</>
	)
}