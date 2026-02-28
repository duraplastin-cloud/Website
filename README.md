# Duraplast website (single file)

One-page static site for Duraplast. Everything is in **one main file**: `index.html` (inline CSS and JS). Only the logo is a separate file: `logo.png` in the same folder.

## Run / preview

- Open `index.html` in your browser, or
- Use a local server:

```powershell
cd "E:\Duraplast\Website"
python -m http.server 5500
```

Then open `http://localhost:5500`.

## Files in this folder

- `index.html` — Single page with Home, Products, About, Factsheet, Contact and enquiry form
- `logo.png` — Company logo (required for the page to show the logo)

## Update enquiry email

In `index.html`, find the enquiry form and change the `data-to` attribute to your email (e.g. `data-to="work@duraplast.co.in"`).

## Content reference

Company details from the Duraplast IndiaMART profile:  
`https://www.indiamart.com/duraplast/profile.html`
