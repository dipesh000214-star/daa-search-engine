# DAA.com Search Engine

A responsive, dark-themed search website with Web, Images, Videos, and News tabs. Live results are returned by Google's Programmable Search / Custom Search JSON API through a small Node.js server, so the API key is not embedded in the browser code.

## Run locally
1. Install Node.js 18 or newer.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Copy `.env.example` to a new file named `.env`.
5. Add your own API key and Programmable Search Engine ID to `.env`.
6. Run `npm start`.
7. Open `http://localhost:3000`.

## Connect live search
1. Create/configure a Programmable Search Engine in Google's Programmable Search Engine control panel and configure which web sources it can search.
2. In Google Cloud Console, enable the Custom Search JSON API and create an API key.
3. Set `GOOGLE_CSE_API_KEY` and `GOOGLE_CSE_ID` in `.env` for local use.
4. Restart the server.

Google API usage, quotas, pricing, and availability can change; check the current terms before relying on it for a public service.

## Publish online using Render
This project includes `render.yaml` for a Render web service.
1. Create a GitHub account if you do not already have one.
2. Create a new GitHub repository and upload the project files (do not upload `.env` or any API secrets).
3. Create a Render account and choose **New → Web Service**, then connect the repository.
4. Render should detect `render.yaml`. If asked, use build command `npm install` and start command `npm start`.
5. In the Render service's **Environment** settings, add:
   - `GOOGLE_CSE_API_KEY` = your private Google API key
   - `GOOGLE_CSE_ID` = your Programmable Search Engine ID
6. Deploy. Render will provide a public `*.onrender.com` address.

Do not publish your API key in frontend code, screenshots, public repositories, or messages. Store it only in the host's private environment settings.

## Use a custom domain
You need to own or purchase a domain before you can attach it. `daa.com` may already be registered; check availability with a domain registrar. In Render, open the service's **Settings → Custom Domains**, add your domain, then follow Render's DNS instructions at your domain registrar. DNS changes can take time to propagate.

## Important
- This project does not register or purchase a domain, create third-party accounts, or generate API credentials.
- Live results require valid credentials and may be subject to provider quotas/pricing.
- The Images tab uses image search. Videos and News tabs currently run web searches with “video” or “news” added to the query; they are not dedicated video/news indexes.
