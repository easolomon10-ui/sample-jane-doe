# AthleteCV Business

## Starting a New Client Site

1. Duplicate the `_template/` folder and rename it to the client's name (e.g., `clients/sarah-jones/`)
2. Open `index.html` in VS Code
3. Replace every `[PLACEHOLDER]` with the client's real information
4. Add the client's photos to the folder (rename them to match: `hero-photo.jpg`, `head.jpg`, etc.)
5. Create a new GitHub repo named after the client (e.g., `sarah-jones-soccer-cv`)
6. Push the folder to that repo
7. In Netlify: Add new site → Import from GitHub → select the new repo → Deploy
8. Assign a custom domain if the client wants one

## Folder Structure

```
AthleteCV-Business/
  _template/              ← Copy this for every new client
  clients/
    jordan-williams-demo/ ← Example demo site to show potential clients
    [client-name]/        ← Each client's live site files
```

## Making Changes to an Existing Client Site

1. Open the client's folder in VS Code
2. Make edits (describe changes to Claude if needed)
3. Push to GitHub — Netlify auto-deploys within ~30 seconds

## Client Tracker

| Client Name     | GitHub Repo                  | Live URL                          | Last Updated |
|-----------------|------------------------------|-----------------------------------|--------------|
| Eileen Solomon  | Eileen-Solomon-Soccer-CV     | (your current GitHub Pages URL)   | 2026-06-03   |
| Jordan Williams | jordan-williams-demo         | (demo only, not yet live)         | 2026-06-03   |
