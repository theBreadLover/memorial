type properties = {
	author: string,
	relation: string,
	message: string,
}

export default function MessageSection({author, relation, message}: properties) {

	let paragraphs: string[] = message.trim().split('\n');

	return (
		<article
			className="tribute-message"
			aria-label={`Message from ${relation}`}
		>
			<h3 className="font-semibold text-lg text-slate-800">{author}</h3>
			<p className="eyebrow-label">{relation}</p>
			{paragraphs.map((paragraph: string, index: number) => (
					<p key={index} className="text-slate-600">
						{paragraph.trim()}
					</p>
			))}
		</article>
	)
}