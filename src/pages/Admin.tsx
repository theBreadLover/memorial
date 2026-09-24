import { useEffect, useState } from "react";
import {
	approveMessage,
	getPendingMessages,
	rejectMessage,
	type TributeMessage,
} from "../utils/messageStore";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "changeme";

export default function Admin() {
	const [unlocked, setUnlocked] = useState(false);
	const [passwordInput, setPasswordInput] = useState("");
	const [pending, setPending] = useState<TributeMessage[]>([]);

	function refresh() {
		setPending(getPendingMessages());
	}

	useEffect(() => {
		if (unlocked) refresh();
	}, [unlocked]);

	if (!unlocked) {
		return (
			<section className="w-full max-w-sm mx-auto py-14 sm:py-24 px-4 text-center">
				<h1 className="text-2xl font-semibold text-slate-800 mb-4">Admin sign-in</h1>
				<input
					type="password"
					value={passwordInput}
					onChange={(e) => setPasswordInput(e.target.value)}
					placeholder="Passphrase"
					className="form-field-input mb-3"
				/>
				<button
					onClick={() => setUnlocked(passwordInput === ADMIN_PASSWORD)}
					className="btn-primary"
				>
					Enter
				</button>
			</section>
		);
	}

	return (
		<section className="w-full max-w-2xl mx-auto py-10 sm:py-16 px-4">
			<h1 className="text-2xl font-semibold text-slate-800 mb-6">
				Pending messages ({pending.length})
			</h1>

			{pending.length === 0 && (
				<p className="text-slate-500">Nothing waiting for review.</p>
			)}

			<div className="space-y-4">
				{pending.map((m) => (
					<div
						key={m.id}
						className="card-surface"
					>
						<p className="eyebrow-label">{m.relation}</p>
						<p className="text-slate-700">&ldquo;{m.text}&rdquo;</p>
						<p className="mt-2 text-sm text-slate-500">— {m.author}</p>
						<div className="mt-4 flex gap-3">
							<button
								onClick={() => {
									approveMessage(m.id);
									refresh();
								}}
								className="btn-primary px-4 py-1.5 text-sm"
							>
								Approve
							</button>
							<button
								onClick={() => {
									rejectMessage(m.id);
									refresh();
								}}
								className="btn-secondary"
							>
								Reject
							</button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}