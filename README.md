# 🚍 RBT – Regal Bus Transport L.L.C

**Bilingual Corporate School Transport Website (Arabic/English)**

> Premium modern website for Regal Bus Transport, Dubai's independent school transportation company. Competes with global leaders like First Student, Zeelo, and regional providers like STS Group.

---

## ✅ Completed Features

### Design & UX
- **Modern corporate design** inspired by top global transport brands (First Student, Zeelo, STS Group)
- **Bilingual support** – Full Arabic (RTL) and English (LTR) toggle with `localStorage` persistence
- **Animated hero section** with speed-line motion graphics reflecting RBT brand identity
- **Scroll animations** via AOS library on all sections
- **Animated stat counters** (68 buses, 15 years, 2000+ students, 100% RTA compliance)
- **Responsive design** – mobile-first, works on all screen sizes

### Pages
- `index.html` – Full homepage with all sections
- `booking.html` – Student transport registration form

### Homepage Sections
1. **Hero** – Bold headline, trust badges, animated CTA buttons
2. **Stats Strip** – Key company numbers with counter animation
3. **Services** – 6 service cards (Daily Routes, Safety-First, Special Needs, Attendance, Charter, Maintenance)
4. **Why RBT / Safety** – Visual floating cards + 3 core pillars
5. **Fleet** – 6 feature cards (A/C, GPS, CCTV, First Aid, Emergency Exits, Inspections)
6. **Schools** – Partnership cards for North American International School + Arab Unity School + CTA to join
7. **How It Works** – 4-step process for parents
8. **About Us** – Company story + stats card + RTA certification badge
9. **Testimonials** – 3 parent reviews
10. **Contact** – Contact info, payment methods, quick enquiry form
11. **Footer** – Full footer with links, hours, payments

### Booking Form (booking.html)
- Parent/Guardian information
- Student details (name, school, grade)
- Transport preferences (area, service type)
- Important notes about fees and installments
- Sidebar with contact info, installment schedule, payment methods, Why RBT

### Data
- **`booking_enquiries` table** stores all form submissions via RESTful Table API
- Fields: parent name, email, phone, student name, school, grade, pickup area, service type, message, language, status

---

## 🌐 Entry Points (URIs)

| Page | URL | Description |
|------|-----|-------------|
| Homepage | `/index.html` | Main landing page |
| Registration | `/booking.html` | Student transport registration form |
| Quick Enquiry | `/index.html#contact` | Quick contact form section |

### API Endpoints Used
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `tables/booking_enquiries` | Submit booking/enquiry |
| GET | `tables/booking_enquiries` | List all submissions (admin) |

---

## 🎨 Brand Identity

| Element | Value |
|---------|-------|
| Primary Blue | `#0A2E6E` |
| Mid Blue | `#1259B5` |
| Cyan/Bright | `#16A5E3` / `#1E9BD7` |
| Gold Accent | `#F5A623` |
| Gradient | `135deg, #0A2E6E → #1259B5 → #16A5E3` |
| Font EN | Inter |
| Font AR | Cairo |

---

## 📁 File Structure

```
index.html              – Homepage
booking.html            – Registration form
css/
  style.css             – All styles (bilingual, responsive)
js/
  main.js               – Language toggle, counters, forms, AOS, navbar
README.md
```

---

## ⚡ Features Not Yet Implemented

- [ ] Upload actual RBT logo image (PNG file)
- [ ] Live bus tracking integration (GPS dashboard for parents)
- [ ] Parent portal / login area
- [ ] Payment gateway integration (online payment for Skiply)
- [ ] Route coverage map (interactive Dubai area map)
- [ ] Admin dashboard to view/manage booking enquiries
- [ ] WhatsApp chat widget
- [ ] SMS notification service integration
- [ ] Multi-student registration (add multiple children in one form)
- [ ] School partner portal / admin login

---

## 🚀 Recommended Next Steps

1. **Add the real RBT logo** – Upload `rbt-logo.png` to `images/` folder and replace the CSS text logo
2. **Add real photos** – Bus fleet photos, team photos, Dubai areas served map
3. **Deploy** – Use the **Publish tab** to go live
4. **WhatsApp integration** – Add floating WhatsApp button for instant parent support
5. **Google Maps** – Embed Dubai service area map in the fleet/contact section
6. **Analytics** – Add Google Analytics / Meta Pixel tracking
7. **SEO** – Add structured data (LocalBusiness schema) for Dubai search visibility

---

## 📊 Data Models

### `booking_enquiries` Table
| Field | Type | Description |
|-------|------|-------------|
| id | text | Auto-generated UUID |
| parent_name | text | Parent/guardian full name |
| email | text | Email address |
| phone | text | Phone number |
| student_name | text | Student full name |
| school_name | text | School attending |
| grade | text | Grade/year |
| pickup_area | text | Pickup location |
| service_type | text | Service requested |
| message | rich_text | Notes/questions |
| language | text | Submission language (en/ar) |
| status | text | New / Contacted / Confirmed / Cancelled |
| created_at | datetime | Auto timestamp |

---

*Built with: HTML5, CSS3 (vanilla), Vanilla JS, AOS animations, Font Awesome icons, Google Fonts (Inter + Cairo)*
