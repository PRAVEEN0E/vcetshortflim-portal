# Velalar College of Engineering and Technology (VCET)
## State Level Short Film Competition 2026 — Registration System

> **“SHOW YOUR STORY. CREATE YOUR IMPACT.”**  
> A production-ready, full-stack State Level Short Film Competition Registration web application built for Velalar College of Engineering and Technology, Thindal, Erode, Tamil Nadu.

---

## 📽️ System Architecture & Modules

The platform is purpose-built with **ONLY TWO MODULES**:
1. **Public Registration**:
   - Cinematic film festival landing page with festival highlights, rules, prizes, and schedule.
   - 5-step registration wizard (`Institution` → `Team` → `Members (Max 5)` → `Film & Drive Submission` → `Review`).
   - Manual UPI Payment verification page (`/register/payment`) featuring direct QR code scan, UPI ID copy, and screenshot upload.
   - Server-side unique registration number generation (`REG-2026-XXXX`).
   - Printable / downloadable registration confirmation slip (`/register/success`).
2. **Admin Panel**:
   - Secure server-side authenticated login (`/admin/login`) with HTTP-only cookies and bcrypt/JWT.
   - Real-time statistics dashboard (`/admin/dashboard`): Total Registrations, Pending/Verified/Rejected Payments, Approved/Rejected Registrations.
   - Comprehensive registration table with instant search (Reg Number, Team, Leader, Film Title, Phone), filters (School/College, District, Payment Status, Review Status), and sorting.
   - Full registration dossier view (`/admin/registrations/[id]`) with Cloudinary payment screenshot inspection (zoom lightbox) and two-tier confirmation actions:
     - **Payment Verification**: `PENDING` → `VERIFIED` or `REJECTED`
     - **Film Approval**: `PENDING` → `APPROVED` or `REJECTED`

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Cinematic Glassmorphism Design System
- **Animations**: Framer Motion
- **Form & Validation**: React Hook Form + Zod
- **Database**: Neon PostgreSQL + Prisma ORM 7
- **Media Storage**: Cloudinary (Server-side upload only, secure URLs stored in DB)
- **Deployment**: Vercel

---

## 🚀 Setup & Installation Instructions

Follow these step-by-step instructions to set up, configure, and launch the application:

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd vcet-shortflim

# Install dependencies
npm install
```

---

### 2. Configure Neon PostgreSQL Database

1. Sign up or log in at [Neon Console](https://console.neon.tech).
2. Create a new PostgreSQL project named `vcet-shortfilm`.
3. Copy your pooled connection string (format: `postgresql://[user]:[password]@[endpoint].neon.tech/neondb?sslmode=require`).
4. Paste this connection string as `DATABASE_URL` in your `.env` file.

---

### 3. Configure Prisma ORM

In `prisma/schema.prisma`, verify the database datasource and client output:

```prisma
datasource db {
  provider = "postgresql"
}

generator client {
  provider = "prisma-client"
  output   = "./generated/client"
}
```

Run Prisma Client generation:
```bash
npx prisma generate
```

---

### 4. Run Migrations

To apply the database schema to your Neon PostgreSQL instance:

```bash
# Push schema directly to Neon PostgreSQL
npx prisma db push

# Or run standard migration
npx prisma migrate dev --name init
```

---

### 5. Configure Cloudinary

1. Sign up or log in at [Cloudinary](https://cloudinary.com).
2. From your Cloudinary Dashboard, copy:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
3. Update `.env`:
   ```env
   CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="your_api_key"
   CLOUDINARY_API_SECRET="your_api_secret"
   ```
4. Screenshots are uploaded securely from the server to the folder:
   `short-film-competition/payments/registration-REG-2026-XXXX`

---

### 6. Configure UPI ID & QR Code

1. In `.env`, configure the official college UPI ID:
   ```env
   NEXT_PUBLIC_UPI_ID="vcetfilms@okaxis"
   NEXT_PUBLIC_PAYMENT_QR_URL="/images/vcet-upi-qr.svg"
   ```
2. You can replace `/public/images/vcet-upi-qr.svg` with your institution's specific payment QR code.

---

### 7. Configure Admin Credentials

In `.env`, define the administrator email and credentials:

```env
ADMIN_EMAIL="admin@vcet.ac.in"
ADMIN_PASSWORD="vcet@shortfilm2026"
ADMIN_JWT_SECRET="vcet_shortfilm_fest_2026_super_secure_jwt_token_secret_vcet"
```

> **Note**: For production environments, you can also generate a bcrypt password hash using `bcryptjs` and set `ADMIN_PASSWORD_HASH`.

---

### 8. Run Locally

Start the development server:

```bash
npm run dev
```

Visit the application in your browser:
- Public Portal: `http://localhost:3000`
- Rules & Guidelines: `http://localhost:3000/rules`
- Prizes & Awards: `http://localhost:3000/prizes`
- Public Registration: `http://localhost:3000/register`
- Admin Login: `http://localhost:3000/admin/login`
- Admin Dashboard: `http://localhost:3000/admin/dashboard`

---

### 9. Deploy to Vercel

1. Push your code to GitHub / GitLab / Bitbucket.
2. Go to [Vercel](https://vercel.com) and click **"New Project"**.
3. Import the repository.
4. In the **Environment Variables** section, add all variables from `.env.example`:
   - `DATABASE_URL`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD` (or `ADMIN_PASSWORD_HASH`)
   - `ADMIN_JWT_SECRET`
   - `NEXT_PUBLIC_UPI_ID`
   - `NEXT_PUBLIC_PAYMENT_QR_URL`
   - `NEXT_PUBLIC_APP_URL`
5. Click **Deploy**. Vercel will build and launch the application globally on edge network.

---

## 🏆 Competition Details

| Feature | Details |
|---|---|
| **Host Institution** | Velalar College of Engineering and Technology, Thindal, Erode |
| **Theme** | Open Theme |
| **Eligibility** | 10th, 11th, 12th School Students & College Students across Tamil Nadu |
| **Team Size** | Maximum 5 Members |
| **Film Duration** | Maximum 10 Minutes (Strictly enforced) |
| **Registration Fee** | ₹500 per Team |
| **Registration Cutoff** | 19 October 2026 |
| **Competition Date** | 22 October 2026 |
| **Prizes** | 1st: ₹20,000 + Trophy + Certificate<br>2nd: ₹10,000 + Trophy + Certificate<br>3rd: ₹5,000 + Trophy + Certificate<br>Craft Awards: ₹1,000 each (Director, Actor, Cinematography, Editing, Story)<br>Participation medals &amp; certificates for all |
| **Coordinators** | Surya: `+91 73584 12012`<br>Pradeep: `+91 74188 62116` |

---

## 🔒 Security & Validation Highlights

- **Server-Side Validation**: Every field is strictly verified using Zod before processing.
- **Client Status Protection**: Clients cannot alter payment or registration status. All verification flows require an authenticated admin session.
- **Secret Protection**: Neon database connection strings and Cloudinary API Secrets are kept exclusively in server actions and never sent to client bundles.
- **File Validation**: Payment screenshots are strictly validated for MIME type (`image/jpeg`, `image/png`, `image/webp`) and size limits (&le; 5 MB).
- **Duplicate Prevention**: Submissions are checked against duplicate team leader mobile numbers and Google Drive links.
- **Atomic Transactions**: Database records for registration and crew members are created in a single Prisma transaction.
