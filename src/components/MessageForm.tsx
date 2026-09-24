import { useState } from "react";
import { submitMessage } from "../utils/messageStore";

export default function MessageForm() {
	const [author, setAuthor] = useState("");
	const [relation, setRelation] = useState("");
	const [text, setText] = useState("");
	const [submitted, setSubmitted] = useState(false);

	function handleSubmit(e: React.SubmitEvent) {
		e.preventDefault();
		if (!author.trim() || !relation.trim() || !text.trim()) return;
		submitMessage(author, relation, text);
		setAuthor("");
		setRelation("");
		setText("");
		setSubmitted(true);
	}

	if (submitted) {
		return (
			<div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center text-emerald-800">
				Thank you — your message has been sent for review and will appear here once approved.
				<button
					className="block mx-auto mt-3 text-sm underline text-accent-color"
					onClick={() => setSubmitted(false)}
				>
					Share another memory
				</button>
			</div>
		);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="card-surface space-y-4"
		>
			<h3 className="text-lg font-semibold text-slate-800">Share a memory</h3>
			<div>
				<label className="block text-sm text-slate-600 mb-1">Your name</label>
				<input
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
					required
					className="form-field-input"
				/>
			</div>
			<div>
				<label className="block text-sm text-slate-600 mb-1">Your relation to Edwin</label>
				<input
					value={relation}
					onChange={(e) => setRelation(e.target.value)}
					placeholder="Friend, Family, Coworker..."
					required
					className="form-field-input"
				/>
			</div>
			<div>
				<label className="block text-sm text-slate-600 mb-1">Your message</label>
				<textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					required
					rows={7}
					className="form-field-input"
				/>
			</div>
			<p className="text-xs text-slate-500">
				Messages are reviewed before they appear publicly.
			</p>
			<button
				type="submit"
				className="btn-primary"
			>
				Send
			</button>
		</form>
	);
}