# Memorial Website for Edwin Hernandez

A memorial website built to honor and remember my friend Edwin. Friends and family can visit the page, look through photos, read his story, and 
leave a message of tribute. Every message and photo is privately reviewed before it ever becomes public.

---

## What the site does

- Shows a homepage with Edwin's photo, name, dates, and his story.
- Shows a photo gallery of memories.
- Lets a visitor write a tribute message, optionally with a photo attached.
- Keeps every submission private until it has been reviewed and approved.
- Gives me (the admin) a private page to approve or reject submissions.
- Emails me the moment a new message comes in, so nothing is missed.

---

## How it works, step by step

### 1. A visitor shares a memory

The public site includes a simple form: name, relation to Edwin, a message, and an optional photo. Submitting it does not make anything public yet — it only sends the submission off for review.

```tsx
// src/components/MessageForm.tsx
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  const imagePath = image ? await uploadImage(image) : null;
  await submitMessage(author, relation, text, imagePath);
  setSubmitted(true);
}
```

If a photo is attached, it is resized in the visitor's own browser before it ever leaves their device, so the site never has to handle a full-size camera photo.

```ts
// src/utils/imageStore.ts
const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.8;

// Shrinks the photo to a sensible size and quality, then uploads it
// into the "pending" folder, where only I -the admin- can reach it.
export async function uploadImage(file: File): Promise<string> {
  const compressed = await compressImage(file);
  const path = `pending/${crypto.randomUUID()}.jpg`;
  await supabase.storage.from("memorial-uploads").upload(path, compressed);
  return path;
}
```

### 2. The submission is checked automatically

Before anything is stored, a small piece of server-side code checks that the message is not empty, not too long, and does not look like spam. This runs on a server, not in the visitor's browser, so it cannot be skipped or tampered with from the outside.

```ts
// supabase/functions/submit-message/index.ts
function looksLikeSpam(text: string): boolean {
  const linkCount = (text.match(/https?:\/\//g) || []).length;
  const repeatedChar = /(.)\1{9,}/.test(text);
  return linkCount > 2 || repeatedChar;
}

if (looksLikeSpam(text)) {
  return new Response(JSON.stringify({ error: "Message was flagged and not submitted." }), {
    status: 400,
  });
}
```

### 3. The message is stored privately, and the admin is notified

Once it passes the checks, the message is saved to the database with a status of "pending" — invisible to the public — and an email goes out right away.

```ts
// supabase/functions/submit-message/index.ts
const { data } = await supabase
  .from("messages")
  .insert({ author, relation, text, image_path: imagePath, status: "pending" })
  .select()
  .single();

await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
  body: JSON.stringify({
    to: ADMIN_EMAIL,
    subject: "New memorial message awaiting review",
    text: `${author} (${relation}) submitted a new message.`,
  }),
});
```

### 4. The admin reviews it

I sign in on a private `/admin` page with their own email and password. Only a signed-in admin can even see what is pending — the database itself 
enforces this, not just the page's design.

```tsx
// src/pages/Admin.tsx
async function handleLogin(e: React.FormEvent) {
  e.preventDefault();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) setLoginError("Incorrect email or password.");
}
```

From there, I can read each pending message, see its photo if one was attached, and approve or reject it.

```tsx
// src/pages/Admin.tsx
async function handleApprove(m: TributeMessage) {
  if (m.imagePath) {
    const approvedPath = await moveImageToApproved(m.imagePath);
    await updateMessageImagePath(m.id, approvedPath);
  }
  await approveMessage(m.id);
}
```

### 5. Approved content goes live

Once approved, the message appears on the public Messages page, and any attached photo is moved into the Gallery, captioned with who sent it. A rejected submission is simply discarded.

```tsx
// src/pages/Gallery.tsx
const submitted = messages
  .filter((m) => m.imagePath)
  .map((m) => ({ id: m.id, path: m.imagePath, caption: `Sent by ${m.author}` }));
```

Photos are never served from a permanent public link. Every image — curated or submitted — is shown through a temporary link that expires after one hour and is freshly generated each time the page loads.

```ts
// src/utils/imageStore.ts
const SIGNED_URL_EXPIRY_SECONDS = 60 * 60;

export async function getSignedImageUrl(path: string): Promise<string | null> {
  const { data } = await supabase.storage
    .from("memorial-uploads")
    .createSignedUrl(path, SIGNED_URL_EXPIRY_SECONDS);
  return data?.signedUrl ?? null;
}
```

---

## What runs where

| Part | What it is | Why it exists |
| --- | --- | --- |
| React site | Built with Vite and TypeScript, hosted on GitHub Pages | The public and admin pages everyone visits |
| Supabase database | A hosted Postgres database | Stores every message and its status: pending, approved, or rejected |
| Supabase Storage | A private file bucket | Holds every photo; nothing is reachable without a signed, expiring link |
| Edge Function | A small server-side script | Validates each submission and sends the email alert, outside the visitor's control |
| Supabase Auth | Real sign-in, not a shared password | Confirms the admin's identity before any pending content can be seen |

---

## Who can do what

- **Visitors** can read the public site, view approved messages and photos, and submit a new tribute.
- **The admin** can additionally see anything still pending, and approve or reject it.
- No one except the admin can see a message or photo before it has been approved.
