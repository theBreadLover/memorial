import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import {
	approveMessage,
	getPendingMessages,
	rejectMessage,
	type TributeMessage,
} from "../utils/messageStore";

export default function Admin() {
	const [session, setSession] = useState<any>(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginError, setLoginError] = useState<string | null>(null);
	const [pending, setPending] = useState<TributeMessage[]>([]);

	useEffect(() => {
		supabase.auth.getSession().then(({data}) => setSession(data.session));
		const {data: listener} = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
		return () => listener.subscription.unsubscribe();
	}, []);

	function refresh() {
		getPendingMessages().then(setPending).catch(() => setPending([]));
	}

	useEffect(() => {
		if (session) refresh();
	}, [session]);

	async function handleLogin(e: React.SubmitEvent) {
		e.preventDefault();
		setLoginError(null);
		const {error} = await supabase.auth.signInWithPassword({email, password});
		if (error) setLoginError("Incorrect email or password.");
	}

	if (!session) {
		return (
			<section className="w-full max-w-sm mx-auto py-14 sm:py-24 px-4 text-center">
				<h1 className="text-2xl font-semibold text-slate-800 mb-4">Admin sign-in</h1>
				<form onSubmit={handleLogin}
				      className="space-y-3">
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						required
						className="form-field-input"
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						required
						className="form-field-input"
					/>
					{loginError && <p className="text-sm text-red-600">{loginError}</p>}
					<button type="submit"
					        className="btn-primary">Sign in
					</button>
				</form>
			</section>
		);
	}

	return (
		<section className="w-full max-w-2xl mx-auto py-10 sm:py-16 px-4">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-semibold text-slate-800">
					Pending messages ({pending.length})
				</h1>
				<button
					onClick={() => supabase.auth.signOut()}
					className="text-sm text-slate-500 underline"
				>
					Sign out
				</button>
			</div>

			{pending.length === 0 && <p className="text-slate-500">Nothing waiting for review.</p>}

			<div className="space-y-4">
				{pending.map((message: TributeMessage) => (
					<div key={message.id}
					     className="card-surface">
						<p className="eyebrow-label">{message.relation}</p>
						<p className="text-slate-700">&ldquo;{message.message}&rdquo;</p>
						<p className="mt-2 text-sm text-slate-500">— {message.author}</p>
						<div className="mt-4 flex gap-3">
							<button
								onClick={async () => {
									await approveMessage(message.id);
									refresh();
								}}
								className="btn-primary px-4 py-1.5 text-sm"
							>
								Approve
							</button>
							<button
								onClick={async () => {
									await rejectMessage(message.id);
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