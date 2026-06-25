# Go-live: van staging-subdomein naar het echte domein

Stappenplan om deze site van de preview `sk-accounting.studio-swyft.be` om te zetten naar
het echte domein `sk-accounting.be`.

> **Kernpunt:** de app blijft op poort **3001** draaien met dezelfde database
> (`sk_accounting_website_db` in de `payload-postgres-prod` container). Enkel het domein
> ervoor verandert → **de klant verliest geen CMS-data**.

Infra-context:
- App-pad op de VPS: `/var/www/sk-accounting` · PM2-proces: `sk-accounting` · poort `3001`
- nginx wordt beheerd via de repo `EloyB/vps-nginx` (`/opt/vps-nginx` + `apply.sh`)
- Deploy: push naar `main` → GitHub Actions → VPS (zie `.github/workflows/deploy.yml`)

---

## 1. DNS (bij de registrar van sk-accounting.be)

Zet de records naar de VPS:

```
A     @     <VPS_IP>
A     www   <VPS_IP>      (of CNAME www → sk-accounting.be)
```

Wacht tot het propageert — controleer vanaf je Mac:

```bash
dig sk-accounting.be +short        # moet het VPS-IP teruggeven
```

> Cert-uitgifte (stap 3) lukt pas zodra dit klopt (HTTP-01 challenge moet de VPS bereiken).

---

## 2. Productie nginx-config (lokaal in de vps-nginx repo)

```bash
cd ~/Documents/Studio-Swyft/vps-nginx
cp sites/_template.conf sites/sk-accounting.be.conf
sed -i '' 's/{{DOMAIN}}/sk-accounting.be/g; s/{{APP_PORT}}/3001/g' sites/sk-accounting.be.conf
git add sites/sk-accounting.be.conf
git commit -m "add sk-accounting.be production nginx config"
git push
```

> De prod-template heeft **geen** `noindex` (in tegenstelling tot de staging-config) — bij
> livegang wil je net wél door Google geïndexeerd worden.
> Werk ook de poort-tabel in de `vps-nginx/README.md` bij (sk-accounting wordt productie).

---

## 3. Cert uitgeven + activeren (op de VPS)

```bash
cd /opt/vps-nginx
git pull
sudo certbot --nginx -d sk-accounting.be -d www.sk-accounting.be
sudo ./apply.sh
curl -I https://sk-accounting.be
```

---

## 4. App op het echte domein wijzen (op de VPS)

```bash
cd /var/www/sk-accounting
sed -i 's#^NEXT_PUBLIC_SERVER_URL=.*#NEXT_PUBLIC_SERVER_URL=https://sk-accounting.be#' .env
pnpm build && pm2 restart sk-accounting --update-env
```

`NEXT_PUBLIC_SERVER_URL` stuurt server-side zaken aan (admin-links, media-URLs, e-mails,
CORS/CSRF die de Payload-helper eruit afleidt). De `.env` op de VPS is de bron — de
CI-deploy raakt dit bestand niet aan.

---

## 5. Staging-subdomein afbouwen

**Optie A — volledig weg:**

```bash
# lokaal in de vps-nginx repo
cd ~/Documents/Studio-Swyft/vps-nginx
git rm sites/sk-accounting.studio-swyft.be.conf
git commit -m "remove sk-accounting staging subdomain (now live on own domain)"
git push

# op de VPS
cd /opt/vps-nginx && git pull && sudo ./apply.sh
sudo certbot delete --cert-name sk-accounting.studio-swyft.be
```

**Optie B — als redirect houden** (handig als de preview-link al rondgestuurd is): laat het
staging-block staan, maar vervang de `location /`-inhoud door:

```nginx
location / {
    return 301 https://sk-accounting.be$request_uri;
}
```

---

## 6. Verifiëren

```bash
curl -I https://sk-accounting.be                    # 200, GEEN x-robots-tag noindex meer
curl -sI https://sk-accounting.be | grep -i robots  # mag niets teruggeven
```

+ admin-login testen op `https://sk-accounting.be/admin`.

---

## Aandachtspunten

- **DB blijft staan** (zelfde `DATABASE_URL` / dezelfde container) → alle content die de
  klant invoerde blijft behouden.
- **Poort 3001 blijft** → geen PM2-wijziging nodig, enkel een rebuild.
- **CI/deploy ongewijzigd:** `deploy.yml` deployt code; de `.env` op de VPS levert de URL.
- **Migrate-strategie:** dit is hét moment om dev-push te vervangen door echte migraties.
  Zet de postgres-adapter op `push: false`, genereer en commit migraties, en zet
  `pnpm payload migrate` terug in `deploy.yml` (die hadden we eruit gehaald omdat hij
  interactief vasthing op een dev-pushed schema). Niet blokkerend om live te gaan, wél
  aan te raden vóór de klant intensief content gaat beheren.

---

## Checklist

- [ ] DNS `sk-accounting.be` (+ `www`) → VPS-IP, propagatie bevestigd met `dig`
- [ ] `sites/sk-accounting.be.conf` aangemaakt + gepusht (vps-nginx)
- [ ] `certbot --nginx -d sk-accounting.be -d www.sk-accounting.be`
- [ ] `sudo ./apply.sh` → `https://sk-accounting.be` geeft 200
- [ ] `.env` → `NEXT_PUBLIC_SERVER_URL=https://sk-accounting.be` + rebuild + restart
- [ ] Staging-subdomein verwijderd of als redirect gezet
- [ ] Staging-cert verwijderd (bij optie A)
- [ ] `noindex` weg op het echte domein (verifieer met `curl -sI`)
- [ ] Admin-login werkt op `https://sk-accounting.be/admin`
