import { useState } from "react";
import { submitMessage } from "../utils/messageStore";
import { uploadImage } from "../utils/imageStore.ts";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5mb

export default function MessageForm() {
	const [author, setAuthor] = useState("");
	const [relation, setRelation] = useState("");
	const [text, setText] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [submitted, setSubmitted] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0] ?? null;
		setError(null);

		if (!file) {
			setImage(null);
			setImagePreview(null);
			return;
		}

		if (!file.type.startsWith("image/")) {
			setError('Please upload an image file');
			return;
		}

		if (file.size > MAX_IMAGE_BYTES) {
			setError('Image is larger than 5MB - please choose a smaller one');
			return;
		}

		setImage(file);
		setImagePreview(URL.createObjectURL(file));
	}

	async function handleSubmit(e: React.SubmitEvent) {
		e.preventDefault();
		if (!author.trim() || !relation.trim() || !text.trim()) return;

		setSubmitting(true);
		setError(null);
		try {
			const imagePath = image ? await uploadImage(image) : null;
			await submitMessage(author, relation, text, imagePath);

			setAuthor("");
			setRelation("");
			setText("");
			setImage(null);
			setImagePreview(null);
			setSubmitted(true);
		} catch {
			setError("Sorry, that message couldn't be sent. Please try again.");
		} finally {
			setSubmitting(false);
		}
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
		<form onSubmit={handleSubmit} className="card-surface space-y-4">
			<h3 className="text-lg font-semibold text-slate-800">Share a memory</h3>
			<div>
				<label className="block text-sm text-accent-color mb-1">Your name</label>
				<input
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
					required
					className="form-field-input"
				/>
			</div>
			<div>
				<label className="block text-sm text-accent-color mb-1">Your relation to Edwin</label>
				<input
					value={relation}
					onChange={(e) => setRelation(e.target.value)}
					placeholder="Friend, Family, Coworker..."
					required
					className="form-field-input"
				/>
			</div>
			<div>
				<label className="block text-sm text-accent-color mb-1">Your message</label>
				<textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					required
					rows={7}
					className="form-field-input"
				/>
			</div>
			<div>
				<label className="block text-sm text-accent-color mb-1">Add a photo (optional)</label>
				<input
					type="file"
					accept="image/*"
					onChange={handleImageChange}
					className="block w-full text-sm text-accent-color file:mr-3 file:rounded-full file:border-0 file:bg-sky-100 file:px-4 file:py-2 file:font-medium"
				/>
				{imagePreview && (
					<img
						src={imagePreview}
						alt="preview of your photo"
						className="mt-3 rounded-xl max-h-48 object-cover"
					/>
				)}
				<p className="text-xs text-slate-500 mt-1">
					Approved photos appear in the gallery.
				</p>
			</div>
			{error && <p className="text-sm text-red-600">{error}</p>}
			<p className="text-xs text-slate-500">Messages are reviewed before they appear publicly.</p>
			<button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
				{submitting ? "Sending…" : "Send"}
			</button>
		</form>
	);
}