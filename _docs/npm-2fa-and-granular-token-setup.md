# npm 2FA & Granular Access Token Setup

Complete guide for setting up two-factor authentication and creating a granular access token to publish `@sdbank/ui`.

---

## Step 1: Create an npm Account

1. Go to https://www.npmjs.com/signup
2. Fill in username, email, and password
3. Verify your email address

---

## Step 2: Log in to npm from the CLI

```bash
npm login
```

- Enter your **username**, **password**, and **email**
- Verify with the confirmation email if prompted
- Confirm login:

```bash
npm whoami
# Should print your npm username
```

---

## Step 3: Create the npm Organization

> Skip if the `sdbank` organization already exists.

1. Go to https://www.npmjs.com/org/create
2. Enter organization name: `sdbank`
3. Choose the **free** plan (unlimited public packages)

---

## Step 4: Enable Two-Factor Authentication (2FA)

npm **requires 2FA** for all package publishing. You must enable it before you can publish.

### Option A: Enable from the website (recommended)

1. Go to https://www.npmjs.com and sign in
2. Click your **profile picture** (top right) → **Account**
3. Scroll to **"Two-Factor Authentication"**
4. Click **Enable 2FA**
5. Choose **Security Key** or **Authenticator App**
6. If using an authenticator app:
   - Install one on your phone: **Google Authenticator**, **Authy**, or **Microsoft Authenticator**
   - Scan the QR code shown on the npm page
   - Enter the 6-digit code from the app to confirm
7. Save the **recovery codes** somewhere safe

### Option B: Enable from the CLI

```bash
npm profile enable-2fa auth-and-writes
```

- Enter your password when prompted
- Follow the instructions to set up your authenticator app

### Verify 2FA is enabled

Go to https://www.npmjs.com → Profile → Account → you should see the TFA management page with options like "Manage Security Keys" and "Recovery Codes".

---

## Step 5: Create a Granular Access Token

Granular access tokens let you publish from the CLI **without entering an OTP code every time** (when bypass 2FA is enabled).

1. Go to https://www.npmjs.com → click your **profile picture** → **Access Tokens**
2. Click **Generate New Token** → **Granular Access Token**
3. Configure the token:
   - **Token name**: e.g., `sdbank-publish`
   - **Expiration**: up to 90 days (npm maximum for write tokens)
   - **Packages and scopes**: select **Only select packages and scopes** → add `@sdbank`
   - **Permissions**: **Read and Write**
   - **Bypass 2FA**: **Enable** (check the box)
4. Click **Generate Token**
5. **Copy the token immediately** — you won't see it again!

---

## Step 6: Configure npm to Use the Token

Run this on the device where you want to publish:

```bash
npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN_HERE
```

This saves the token to your `~/.npmrc` file. Verify:

```bash
npm whoami
# Should print your npm username
```

> **Security note**: Never commit your token to git. The `~/.npmrc` file is in your home directory, not in the project.

---

## Step 7: Publish with the Script

Now you can publish using the interactive script:

```bash
bun run publish:ui
```

The script will:
1. Check git is clean
2. Check npm registry for latest version
3. Prompt for new version number
4. Run tests, type-check, lint
5. Build `@sdbank/ui`
6. Bump version in `packages/ui/package.json` and root `package.json`
7. Create a git commit
8. Publish to npm (using your granular token — no OTP needed)
9. Create a git tag
10. Push commit and tag to remote

---

## Token Renewal

Granular tokens expire after **90 days maximum**. When your token expires:

1. Go to https://www.npmjs.com → **Access Tokens**
2. Delete the expired token
3. Create a new one (repeat Step 5)
4. Update your local config (repeat Step 6)

---

## Troubleshooting

### `E403 Forbidden - Two-factor authentication required`
- Your token doesn't have "Bypass 2FA" enabled
- Create a new token with bypass enabled (Step 5)

### `missing authentication (run bunx npm login)`
- Token not configured — run `npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN`

### `attempted to publish a private package`
- You're running `bun publish` instead of `npm publish` (Bun resolves the workspace root)
- Use the `bun run publish:ui` script which handles this correctly

### `npm ERR! 404 Not Found - PUT - @sdbank/ui`
- The `sdbank` organization doesn't exist on npm — create it first (Step 3)
