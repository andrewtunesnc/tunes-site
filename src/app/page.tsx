"use client";
import React from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Shield, Camera, Cloud, CarFront, CheckCircle2, Wrench, Star } from "lucide-react";

// Visual mockup of the dash cameras landing page for Tunes Car Stereo.
// TailwindCSS-based, sectioned layout, with sticky CTA and clear hierarchy.
// This file is self-contained TSX and uses a single brand blue color via constants.

// -----------------------------
// Theme
// -----------------------------

const BRAND = "#3D9BE9"; // Provided by Andrew
const BRAND_ALPHA_80 = "rgba(61, 155, 233, 0.8)"; // 80% opacity for overlays

// -----------------------------
// Data
// -----------------------------

type BrandCard = { name: string; href: string; img: string; alt: string };

const BRANDS: BrandCard[] = [
  {
    name: "Momento",
    href: "https://www.momentocam.com/dash-cams",
    img: "https://blue.firstechllc.com/wp-content/uploads/M8-Max-w-Box-copy.jpg",
    alt: "Momento M8 Max product photo",
  },
  {
    name: "DroneMobile XC",
    href: "https://www.dronemobile.com/xc-lte-dash-cam",
    img: "https://blue.firstechllc.com/wp-content/uploads/Group-4532.jpg",
    alt: "DroneMobile XC dash cam product photo",
  },
  {
    name: "THINKWARE",
    href: "https://thinkwaredashcam.eu/product/thinkware-dash-cam-f790/",
    img: "https://thinkwaredashcam.eu/wp-content/uploads/2022/05/F790-Main-Image-v3.jpg",
    alt: "Thinkware F790 product photo",
  },
  {
    name: "GNET",
    href: "https://gnet.cam/gnet-g-on2-dash-cam/",
    img: "https://gnet.cam/wp-content/uploads/2023/05/GON2-INstall.png",
    alt: "GNET G-ON2 dash cam product photo",
  },
];

const GALLERY_IMAGES: { src: string; alt: string }[] = BRANDS.map((b) => ({ src: b.img, alt: `${b.name} dash cam product photo` }));

// -----------------------------
// Small UI helpers
// -----------------------------

const Stat = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <div className="flex items-center gap-2 text-sm md:text-base">
    <Icon className="h-5 w-5" aria-hidden />
    <span>{label}</span>
  </div>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs md:text-sm shadow-sm">
    <CheckCircle2 className="h-4 w-4" />
    {children}
  </span>
);

const PackageCard = ({ tier, bullets, badge }: { tier: string; bullets: string[]; badge?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative rounded-2xl border bg-white/80 backdrop-blur shadow-sm p-6 flex flex-col gap-4"
  >
    {badge && (
      <div className="absolute -top-3 right-4 rounded-full text-white text-xs px-3 py-1 shadow" style={{ backgroundColor: BRAND }}>{badge}</div>
    )}
    <h3 className="text-lg font-semibold">{tier}</h3>
    <ul className="space-y-2 text-sm">
      {bullets.map((b, i) => (
        <li key={i} className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
    <button
      className="mt-auto inline-flex justify-center rounded-xl text-white px-4 py-2 text-sm hover:opacity-90"
      style={{ backgroundColor: BRAND }}
    >
      Get My Quote
    </button>
  </motion.div>
);

const Feature = ({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) => (
  <div className="rounded-2xl border bg-white/80 backdrop-blur p-6 shadow-sm">
    <div className="flex items-center gap-3">
      <Icon className="h-6 w-6" />
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="mt-3 text-sm text-neutral-700">{desc}</p>
  </div>
);

const Testimonial = ({ quote, name }: { quote: string; name: string }) => (
  <div className="rounded-2xl border bg-white/80 backdrop-blur p-6 shadow-sm">
    <div className="flex items-center gap-1 text-amber-500" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-500" />
      ))}
    </div>
    <p className="mt-3 text-sm md:text-base">“{quote}”</p>
    <p className="mt-2 text-xs text-neutral-500">— {name}</p>
  </div>
);

// -----------------------------
// Minimal runtime tests (so we always have some tests)
// -----------------------------

export function runMockupTests() {
  const results: string[] = [];

  // Runtime / library checks
  results.push(typeof window !== 'undefined' ? "✓ client runtime" : "ℹ server render");
  // @ts-ignore - motion is an object with element factories
  results.push((motion && typeof motion.div !== 'undefined') ? "✓ framer-motion 'motion' available" : "✗ framer-motion motion is undefined");
  const icons: any[] = [Phone, MapPin, Shield, Camera, Cloud, CarFront, CheckCircle2, Wrench, Star];
  results.push(icons.every((i) => typeof i === 'function') ? "✓ lucide icons loaded" : "✗ some lucide icons undefined");

  // Brand color set
  results.push(BRAND === "#3D9BE9" ? "✓ brand color set to #3D9BE9" : `✗ brand color incorrect: ${BRAND}`);
  results.push(BRAND_ALPHA_80.includes("0.8") ? "✓ brand alpha 80 defined" : "✗ brand alpha not defined");

  // Brand links should be https and have images/alt text
  BRANDS.forEach((b, i) => {
    results.push(
      b.href.startsWith("https://") ? `✓ brand[${i}] link ok` : `✗ brand[${i}] link not https: ${b.href}`
    );
    results.push(b.img ? `✓ brand[${i}] image ok` : `✗ brand[${i}] image missing`);
    results.push(b.alt ? `✓ brand[${i}] alt ok` : `✗ brand[${i}] alt missing`);
  });

  // Gallery mirrors brand images
  results.push(GALLERY_IMAGES.length === BRANDS.length ? "✓ gallery length matches brands" : "✗ gallery length mismatch");

  return results;
}

// -----------------------------
// Page component
// -----------------------------

export default function DashCamLandingMock() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 text-neutral-900">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
          <div className="text-sm md:text-base font-medium">Tunes Car Stereo • Concord, NC</div>
          <div className="flex items-center gap-2">
            <a
              href="tel:17046106023"
              className="inline-flex items-center gap-2 rounded-full text-white px-3 py-1.5 text-sm hover:opacity-90"
              style={{ backgroundColor: BRAND }}
            >
              <Phone className="h-4 w-4" /> Call (704) 610‑6023
            </a>
            <a href="#quote" className="hidden md:inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm hover:bg-neutral-50">
              Get a Quote
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=2000&auto=format&fit=crop"
            alt="Clean modern car interior with dash cam perspective"
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-24 md:py-32">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-white"
          >
            Dash Cameras Installed in Concord, NC
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-4 max-w-2xl text-white/90"
          >
            Keep evidence on your side. Clean, hidden wiring with professional hardwiring and parking‑mode setup. Morning drop‑off, afternoon pickup.
          </motion.p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="tel:17046106023" className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-5 py-3 text-sm md:text-base font-medium shadow hover:bg-neutral-100">
              <Phone className="h-5 w-5" /> Call Now
            </a>
            <a
              href="#quote"
              className="inline-flex items-center gap-2 rounded-xl text-white px-5 py-3 text-sm md:text-base font-medium ring-1 ring-white/20 hover:opacity-90"
              style={{ backgroundColor: BRAND_ALPHA_80 }}
            >
              Get a Fast Quote
            </a>
            <a
              href="https://maps.google.com/?q=Tunes%20Car%20Stereo%20Concord%20NC"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl text-white px-5 py-3 text-sm md:text-base font-medium ring-1 ring-white/20 hover:opacity-90"
              style={{ backgroundColor: BRAND_ALPHA_80 }}
            >
              <MapPin className="h-5 w-5" /> Get Directions
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-white/90">
            <Pill>★★★★★ Hundreds of 5‑star installs</Pill>
            <Pill>Certified installers</Pill>
            <Pill>Lifetime workmanship</Pill>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat icon={Shield} label="Parking‑mode experts" />
          <Stat icon={Wrench} label="Factory‑style wiring" />
          <Stat icon={Camera} label="Single & dual‑channel" />
          <Stat icon={Cloud} label="Cloud‑connected options" />
        </div>
      </section>

      {/* Brands we install */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Brands we install</h2>
        <p className="mt-2 text-neutral-700">We stock and support these leading dash cam brands.</p>
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {BRANDS.map((b) => (
            <a key={b.name} href={b.href} target="_blank" rel="noreferrer" className="group rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md">
              <div className="text-sm font-medium">{b.name}</div>
              <img src={b.img} alt={b.alt} className="mt-3 aspect-square w-full object-contain rounded-xl border" />
            </a>
          ))}
        </div>
      </section>

      {/* Why a Dash Cam */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Why a Dash Cam?</h2>
            <p className="mt-3 text-neutral-700">
              Accident evidence, hit‑and‑run protection, parking‑lot recording, teen driver accountability, and fleet safety. We match the right camera and setup to your vehicle and goals.
            </p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                "Accident & insurance evidence",
                "Parking incidents captured",
                "Front‑only or front + rear",
                "1080p to 4K clarity",
              ].map((x, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" /> {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1518551933037-763c4f5804a3?q=80&w=1600&auto=format&fit=crop"
              alt="Discreet dash camera mounted behind mirror"
              className="rounded-2xl shadow-lg border"
            />
            <div className="absolute -bottom-4 -right-4 rounded-2xl border bg-white/80 backdrop-blur px-4 py-3 shadow">
              <div className="flex items-center gap-2 text-sm"><CarFront className="h-4 w-4" /> Clean, hidden wiring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Chooser */}
      <section className="mx-auto max-w-7xl px-4 pb-4">
        <div className="rounded-3xl border bg-white p-6 md:p-10 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-semibold">Which setup fits your vehicle?</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <Feature icon={Camera} title="Single vs Dual" desc="Front‑only for basics, or add a rear camera for complete coverage." />
            <Feature icon={Shield} title="Parking Mode" desc="Hardwire for parked recording with safe low‑voltage cutoff or add a battery pack." />
            <Feature icon={Cloud} title="Cloud / Live View" desc="Optional cloud features for alerts, viewing, and clips from anywhere." />
          </div>
          <div className="mt-6">
            <a
              href="#quote"
              className="inline-flex items-center gap-2 rounded-xl text-white px-5 py-3 text-sm md:text-base font-medium hover:opacity-90"
              style={{ backgroundColor: BRAND }}
            >
              Ask a Pro
            </a>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Packages</h2>
        <p className="mt-2 text-neutral-700">No one‑size‑fits‑all pricing. We recommend the right hardware and a clean install after a quick consult.</p>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <PackageCard
            tier="Good"
            bullets={["Front camera + pro hardwire", "Parking‑mode ready", "Fuse‑tap integration"]}
          />
          <PackageCard
            tier="Better"
            bullets={["Front + rear higher resolution", "Parking mode kit included", "Calibrated mounting angle"]}
          />
          <PackageCard
            tier="Best"
            badge="Most Popular"
            bullets={["4K front + 2K rear", "Buffered parking mode + cutoff", "Optional cloud / live alerts"]}
          />
        </div>
        <div className="mt-6 text-sm text-neutral-700">
          <strong>Popular add‑ons:</strong> Low‑profile mirror mount, parking battery, interior cam (rideshare), cable concealment for specific models, <em>DroneMobile XC Dash Camera</em> (service not included for the first year).
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Install Gallery</h2>
        <p className="mt-2 text-neutral-700">A few examples of our tidy cable management and discreet mounting.</p>
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <img key={i} src={img.src} alt={img.alt} className="aspect-video w-full rounded-xl object-cover border" />
          ))}
        </div>
      </section>

      {/* Difference */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-3xl border bg-white p-6 md:p-10 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-semibold">Our Install Difference</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6 text-sm">
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5" /> Hidden wiring & factory‑style routing</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5" /> Fuse‑tap integration (no dangling cords)</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5" /> Calibrated angle & exposure tuning</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5" /> Same‑day drop‑off and pickup in most cases</li>
            </ul>
            <div className="rounded-2xl border p-4 bg-neutral-50">
              <p className="text-sm"><strong>Customer‑supplied units:</strong> We can install your dash cam, but we cannot warranty customer‑supplied products or outcomes. Installation services only; product concerns go to the manufacturer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 pb-8">
        <h2 className="text-2xl md:text-3xl font-semibold">FAQ</h2>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {[
            { q: "How long does the install take?", a: "Most installs are same‑day: morning drop‑off and afternoon pickup." },
            { q: "Do you hide all wires?", a: "Yes—wiring is routed behind trim and to the fuse panel." },
            { q: "Do I need a hardwire kit?", a: "Yes for parking mode and cleaner operation." },
            { q: "Can you install my existing dash cam?", a: "Yes, with the customer‑supplied note above." },
            { q: "Will this drain my battery?", a: "We set low‑voltage cutoffs or recommend a dedicated battery." },
            { q: "Do you support 4K dual‑channel?", a: "Absolutely; we’ll match the camera to your needs." },
          ].map((item, i) => (
            <details key={i} className="rounded-2xl border bg-white p-4">
              <summary className="cursor-pointer font-medium">{item.q}</summary>
              <p className="mt-2 text-sm text-neutral-700">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote" className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Get a Fast Dash Cam Quote</h2>
            <p className="mt-2 text-neutral-700">Tell us your vehicle and preferred setup. We’ll recommend the best option and schedule your install.</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Front‑only or Front + Rear</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Parking Mode options</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Customer‑supplied or purchased here</li>
            </ul>
          </div>
          <form className="rounded-2xl border bg-white p-6 shadow-sm grid grid-cols-1 gap-4">
            <div className="grid gap-1">
              <label className="text-sm">Name</label>
              <input className="rounded-xl border px-3 py-2" placeholder="Your name" />
            </div>
            <div className="grid gap-1">
              <label className="text-sm">Phone</label>
              <input className="rounded-xl border px-3 py-2" placeholder="(704) 610‑6023" />
            </div>
            <div className="grid gap-1">
              <label className="text-sm">Email</label>
              <input className="rounded-xl border px-3 py-2" placeholder="you@example.com" />
            </div>
            <div className="grid gap-1">
              <label className="text-sm">Vehicle Year / Make / Model</label>
              <input className="rounded-xl border px-3 py-2" placeholder="e.g., 2021 Toyota 4Runner" />
            </div>
            <div className="grid gap-1">
              <label className="text-sm">Setup</label>
              <select className="rounded-xl border px-3 py-2">
                <option>Front Only</option>
                <option>Front + Rear</option>
                <option>Front + Interior</option>
              </select>
            </div>
            <div className="grid gap-1">
              <label className="text-sm">Parking Mode</label>
              <select className="rounded-xl border px-3 py-2">
                <option>Yes</option>
                <option>No</option>
                <option>Not Sure</option>
              </select>
            </div>
            <div className="grid gap-1">
              <label className="text-sm">New purchase or customer‑supplied?</label>
              <select className="rounded-xl border px-3 py-2">
                <option>Purchase from Tunes</option>
                <option>Customer‑supplied unit</option>
              </select>
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-600">
              <input id="sms" type="checkbox" className="mt-1" />
              <label htmlFor="sms">I agree to be contacted by phone/SMS and email about my request.</label>
            </div>
            <button
              type="button"
              className="rounded-xl text-white px-5 py-3 text-sm md:text-base font-medium hover:opacity-90"
              style={{ backgroundColor: BRAND }}
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-7xl px-4 pb-24">
        <div className="rounded-3xl border bg-white p-6 md:p-10 shadow-sm">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">Visit Us</h2>
              <p className="mt-2 text-neutral-700">Stop by our Concord showroom to see dash cams in person and chat with a certified installer.</p>
              <div className="mt-4 space-y-1 text-sm">
                <div className="flex items-center gap-2"><MapPin className="h-5 w-5" /> Concord, NC • Tunes Car Stereo</div>
                <div className="flex items-center gap-2"><Phone className="h-5 w-5" /> (704) 610‑6023</div>
              </div>
              <div className="mt-4 flex gap-2">
                <a
                  href="tel:17046106023"
                  className="inline-flex items-center gap-2 rounded-xl text-white px-4 py-2 text-sm hover:opacity-90"
                  style={{ backgroundColor: BRAND }}
                >
                  <Phone className="h-4 w-4" /> Call Now
                </a>
                <a href="https://maps.google.com/?q=Tunes%20Car%20Stereo%20Concord%20NC" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm hover:bg-neutral-50">
                  <MapPin className="h-4 w-4" /> Directions
                </a>
              </div>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-xl border">
              <iframe
                title="Map"
                className="h-full w-full"
                src="https://www.google.com/maps?q=Tunes+Car+Stereo+Concord+NC&output=embed"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky bottom CTA */}
      <div className="fixed inset-x-0 bottom-3 z-50 px-4">
        <div className="mx-auto max-w-3xl rounded-2xl border bg-white/90 backdrop-blur shadow-lg p-3 flex items-center justify-between gap-3">
          <div className="text-sm md:text-base font-medium">Ready to protect your drive?</div>
          <div className="flex items-center gap-2">
            <a
              href="tel:17046106023"
              className="inline-flex items-center gap-2 rounded-xl text-white px-4 py-2 text-sm hover:opacity-90"
              style={{ backgroundColor: BRAND }}
            >
              <Phone className="h-4 w-4" /> Call
            </a>
            <a href="#quote" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm hover:bg-neutral-50">Get Quote</a>
          </div>
        </div>
      </div>

      {/* Footer note (mock) */}
      <footer className="border-t bg-white/70">
        <div className="mx-auto max-w-7xl px-4 py-8 text-xs text-neutral-600">
          © {new Date().getFullYear()} Tunes Car Stereo • Dash Cameras Installed in Concord, NC
        </div>
      </footer>
    </div>
  );
}
