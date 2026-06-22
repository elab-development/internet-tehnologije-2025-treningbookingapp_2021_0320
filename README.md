# C2C Shop - Seminarski Rad

## Project status and quick access

### Credentials (already created):
* **Admin:** test@example.com / vaske140
* **User:** user@example.com / korisnik123
* **Seller** (create with script): seller@example.com / prodavac123

### Run (backend):
1. `cd backend`
2. `docker-compose up -d --build`
3. `docker exec -it market-backend bash`
4. `php artisan migrate --seed`

*To create seller role/user: run inside backend container:* `php tmp_create_seller.php`

### Where to find things (paths relative to repo root):
* **Backend models:** `backend/app/Models/`
* **Backend migrations:** `backend/database/migrations/`
* **API routes:** `backend/routes/api.php`
* **Seeders:** `backend/database/seeders/DatabaseSeeder.php`
* **Public images:** `backend/public/images/sto-stolica.png`
* **Frontend app:** `frontend/src/` (components in `frontend/src/components`)
* **Admin panel frontend route:** `/admin`

### Notes:
* Repo is connected to origin (elab-development). README draft – can expand with screenshots/docs on request.
