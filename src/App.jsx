import React, { useEffect, useMemo, useState } from 'react';
import MagicBento from './components/MagicBento.jsx';

const bentoBaseProps = {
  textAutoHide: true,
  enableStars: true,
  enableSpotlight: true,
  enableBorderGlow: true,
  enableTilt: false,
  enableMagnetism: false,
  clickEffect: true,
  spotlightRadius: 520,
  particleCount: 12,
  glowColor: '132, 0, 255',
  disableAnimations: false
};

const useFadeInObserver = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

const useAnimatedStats = () => {
  useEffect(() => {
    const stats = document.querySelectorAll('[data-target]');
    let statsAnimated = false;

    const animateStats = () => {
      if (statsAnimated) return;
      statsAnimated = true;
      stats.forEach(stat => {
        const target = Number(stat.dataset.target);
        let current = 0;
        const increment = Math.max(1, Math.floor(target / 80));
        const tick = () => {
          current += increment;
          if (current >= target) {
            stat.textContent = target.toLocaleString();
          } else {
            stat.textContent = current.toLocaleString();
            requestAnimationFrame(tick);
          }
        };
        tick();
      });
    };

    const impactSection = document.getElementById('impact');
    if (!impactSection) return undefined;

    const impactObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateStats();
            impactObserver.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    impactObserver.observe(impactSection);

    return () => impactObserver.disconnect();
  }, []);
};

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  useFadeInObserver();
  useAnimatedStats();

  const missionCards = useMemo(
    () => [
      {
        color: '#060010',
        title: 'Mentorship',
        description: 'Placeholder: Pairing youth with coaches and mentors who guide growth and resilience.',
        label: 'Pillar 01'
      },
      {
        color: '#060010',
        title: 'Education',
        description: 'Placeholder: Academic support, tutoring, and college readiness programs.',
        label: 'Pillar 02'
      },
      {
        color: '#060010',
        title: 'Community',
        description: 'Placeholder: Safe spaces, family engagement, and service-driven initiatives.',
        label: 'Pillar 03'
      }
    ],
    []
  );

  const programCards = useMemo(
    () => [
      {
        color: '#060010',
        title: 'Leadership Clinics',
        description: 'Placeholder: Week-long clinics focused on leadership, teamwork, and confidence building.',
        label: 'Program'
      },
      {
        color: '#060010',
        title: 'Academic Support',
        description: 'Placeholder: After-school tutoring and study halls with volunteer educators.',
        label: 'Program'
      },
      {
        color: '#060010',
        title: 'Summer Camps',
        description: 'Placeholder: Intensive camps blending sports training with wellness workshops.',
        label: 'Program'
      },
      {
        color: '#060010',
        title: 'Scholarship Fund',
        description: 'Placeholder: Financial assistance for youth pursuing higher education.',
        label: 'Program'
      }
    ],
    []
  );

  const founderCards = useMemo(
    () => [
      {
        color: '#060010',
        title: 'Placeholder Name',
        description: 'Placeholder: Short bio highlighting their passion and expertise.',
        label: 'Placeholder Role'
      },
      {
        color: '#060010',
        title: 'Placeholder Name',
        description: 'Placeholder: Short bio highlighting their passion and expertise.',
        label: 'Placeholder Role'
      },
      {
        color: '#060010',
        title: 'Placeholder Name',
        description: 'Placeholder: Short bio highlighting their passion and expertise.',
        label: 'Placeholder Role'
      },
      {
        color: '#060010',
        title: 'Placeholder Name',
        description: 'Placeholder: Short bio highlighting their passion and expertise.',
        label: 'Placeholder Role'
      }
    ],
    []
  );

  const impactCards = useMemo(
    () => [
      {
        color: '#060010',
        title: <span className="stat-number" data-target="350">0</span>,
        description: 'Youth Mentored',
        label: 'Impact'
      },
      {
        color: '#060010',
        title: <span className="stat-number" data-target="28">0</span>,
        description: 'Community Partners',
        label: 'Impact'
      },
      {
        color: '#060010',
        title: <span className="stat-number" data-target="12000">0</span>,
        description: 'Hours of Support',
        label: 'Impact'
      },
      {
        color: '#060010',
        title: <span className="stat-number" data-target="85">0</span>,
        description: 'Scholarships Awarded',
        label: 'Impact'
      }
    ],
    []
  );

  const involvedCards = useMemo(
    () => [
      {
        color: '#060010',
        title: 'Donate',
        description: 'Placeholder: Make an impact with a one-time or recurring gift.',
        label: 'Support'
      },
      {
        color: '#060010',
        title: 'Volunteer',
        description: 'Placeholder: Coach, tutor, or mentor youth in your community.',
        label: 'Support'
      },
      {
        color: '#060010',
        title: 'Partner',
        description: 'Placeholder: Collaborate with us to expand opportunities.',
        label: 'Support'
      },
      {
        color: '#060010',
        title: 'Newsletter',
        description: 'Placeholder: Stay informed about events, stories, and updates.',
        label: 'Support'
      }
    ],
    []
  );

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setFormStatus('Please complete all required fields.');
      return;
    }
    setFormStatus('Thank you! Placeholder: Your message has been received.');
    form.reset();
  };

  return (
    <>
      <header>
        <div className="container nav" aria-label="Primary">
          <div className="logo">
            <div className="logo-mark" aria-hidden="true">BM</div>
            <span>BasketMinds</span>
          </div>
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`} id="navLinks">
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#mission" onClick={() => setMenuOpen(false)}>Our Mission</a>
            <a href="#founders" onClick={() => setMenuOpen(false)}>Founders</a>
            <a href="#involved" onClick={() => setMenuOpen(false)}>Get Involved</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
          <div className="nav-actions">
            <button
              className="menu-toggle"
              id="menuToggle"
              aria-label="Open navigation menu"
              onClick={() => setMenuOpen(prev => !prev)}
            >
              ☰
            </button>
            <a className="btn btn-primary" href="#involved">Donate Now</a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="fade-in">
              <span className="pill">Placeholder: Spotlight Program</span>
              <h1>BasketMinds: Leadership Camps Open Now</h1>
              <p className="hero-subtext">Placeholder: Apply by [Date] to join our signature leadership and mentorship experience for youth athletes.</p>
              <a className="hero-link" href="#programs"><span>Learn More & Apply</span> →</a>
            </div>
            <div className="hero-collage fade-in" aria-label="Hero image collage">
              <div className="hero-image-main" role="img" aria-label="Placeholder: Youth basketball program hero image"></div>
              <div className="hero-collage-card card-top" aria-hidden="true">
                <img
                  src="https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80"
                  alt="Placeholder: Mentor moment"
                />
              </div>
              <div className="hero-collage-card card-bottom" aria-hidden="true">
                <img
                  src="https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=800&q=80"
                  alt="Placeholder: Community workshop"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container fade-in">
            <h2 className="section-title">About BasketMinds</h2>
            <p className="section-subtitle">Placeholder: Use this space to introduce the organization, its story, and the communities it serves. Keep it concise and mission-driven.</p>
          </div>
        </section>

        <section className="section mission" id="mission">
          <div className="container">
            <div className="fade-in">
              <h2 className="section-title">Our Mission</h2>
              <p className="section-subtitle">Placeholder: We equip youth with life skills, academic resources, and mentorship through the power of basketball.</p>
            </div>
            <MagicBento {...bentoBaseProps} cards={missionCards} />
          </div>
        </section>

        <section className="section" id="programs">
          <div className="container">
            <div className="fade-in">
              <h2 className="section-title">Our Programs</h2>
              <p className="section-subtitle">Placeholder: Highlight the programs that make the biggest impact in your community.</p>
            </div>
            <MagicBento {...bentoBaseProps} cards={programCards} />
          </div>
        </section>

        <section className="section founders" id="founders">
          <div className="container">
            <div className="fade-in">
              <h2 className="section-title">Meet Our Founders</h2>
              <p className="section-subtitle">Placeholder: Introduce the leaders who shaped BasketMinds and its vision.</p>
            </div>
            <MagicBento {...bentoBaseProps} cards={founderCards} />
          </div>
        </section>

        <section className="section" id="impact">
          <div className="container">
            <div className="fade-in">
              <h2 className="section-title">Our Impact</h2>
              <p className="section-subtitle">Placeholder: Use real impact metrics to build trust and showcase progress.</p>
            </div>
            <MagicBento {...bentoBaseProps} cards={impactCards} />
          </div>
        </section>

        <section className="section get-involved" id="involved">
          <div className="container">
            <div className="fade-in">
              <h2 className="section-title">Get Involved</h2>
              <p className="section-subtitle">Placeholder: Share the most meaningful ways to support BasketMinds.</p>
            </div>
            <MagicBento {...bentoBaseProps} cards={involvedCards} />
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container">
            <div className="fade-in">
              <h2 className="section-title">Contact Us</h2>
              <p className="section-subtitle">Placeholder: We would love to hear from you. Fill out the form or reach us through the channels below.</p>
            </div>
            <div className="contact-grid">
              <form id="contactForm" className="fade-in" aria-label="Contact form" onSubmit={handleSubmit}>
                <div className="field-group">
                  <div>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" placeholder="Placeholder: First Name" required />
                  </div>
                  <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" placeholder="Placeholder: Last Name" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="Placeholder: Email" required />
                </div>
                <div>
                  <label htmlFor="subject">Subject</label>
                  <input id="subject" name="subject" type="text" placeholder="Placeholder: Subject" required />
                </div>
                <div>
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" placeholder="Placeholder: Your message" required></textarea>
                </div>
                <button className="btn btn-primary" type="submit">Send Message</button>
                <p id="formStatus" aria-live="polite" style={{ color: 'var(--gray-500)' }}>{formStatus}</p>
              </form>

              <div className="contact-info fade-in" aria-label="Contact information">
                <div className="info-item">
                  <div className="info-icon">@</div>
                  <div>
                    <strong>Email</strong>
                    <p>Placeholder: hello@basketminds.org</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">☎</div>
                  <div>
                    <strong>Phone</strong>
                    <p>Placeholder: (000) 123-4567</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">⌂</div>
                  <div>
                    <strong>Address</strong>
                    <p>Placeholder: 123 Community Lane, City, State</p>
                  </div>
                </div>
                <div className="socials" aria-label="Social media">
                  <a href="#" aria-label="BasketMinds LinkedIn">in</a>
                  <a href="#" aria-label="BasketMinds Twitter">x</a>
                  <a href="#" aria-label="BasketMinds Instagram">ig</a>
                  <a href="#" aria-label="BasketMinds Facebook">f</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="logo" style={{ color: '#fff' }}>
                <div className="logo-mark" aria-hidden="true">BM</div>
                <span>BasketMinds</span>
              </div>
              <p>Placeholder: BasketMinds is a nonprofit dedicated to empowering youth through basketball, mentorship, and education.</p>
            </div>
            <div className="footer-links">
              <h3>Quick Links</h3>
              <a href="#home">Home</a>
              <a href="#mission">Our Mission</a>
              <a href="#programs">Programs</a>
              <a href="#involved">Get Involved</a>
            </div>
            <div>
              <h3>Stay Connected</h3>
              <p>Placeholder: Subscribe for updates and stories.</p>
              <div className="footer-newsletter">
                <input type="email" placeholder="Placeholder: Email" aria-label="Newsletter email" />
                <button className="btn btn-primary" type="button">Sign Up</button>
              </div>
              <p style={{ marginTop: '16px' }}>Placeholder: info@basketminds.org</p>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 BasketMinds. Placeholder: All rights reserved.</span>
            <span><a href="#" style={{ color: 'inherit' }}>Privacy Policy</a></span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
