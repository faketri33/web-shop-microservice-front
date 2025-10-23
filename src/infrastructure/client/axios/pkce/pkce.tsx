export function randomString(length = 96) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array).map(n => ('0' + (n % 36).toString(36)).slice(-1)).join('');
}

async function sha256(plain: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return new Uint8Array(hash);
}

function base64UrlEncode(bytes: Uint8Array<ArrayBuffer>) {
    let s = btoa(String.fromCharCode(...bytes));
    return s.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function generatePkcePair() {
    const code_verifier = randomString(96);
    const digest = await sha256(code_verifier);
    const code_challenge = base64UrlEncode(digest);
    return { code_verifier, code_challenge };
}
