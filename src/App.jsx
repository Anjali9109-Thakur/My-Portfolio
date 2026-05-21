import { lazy, Suspense, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Camera,
  Clapperboard,
  Code2,
  Download,
  Edit3,
  GitBranch,
  Image,
  LayoutDashboard,
  Link2,
  Mail,
  Menu,
  MousePointer2,
  Plus,
  RotateCcw,
  Save,
  Sparkles,
  Trash2,
  Upload,
  Video,
  X,
} from "lucide-react";
import profileImage from "../assets/SahilFormalimage.jpeg";
import {
  coCurricularActivities,
  navItems,
  profile,
  projects,
  skills,
  stats,
  technicalEvents,
  timeline,
} from "./data.js";

const ThreeHero = lazy(() => import("./ThreeHero.jsx"));

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const emptyDraft = {
  title: "",
  category: "",
  date: "",
  mediaType: "image",
  media: "",
  description: "",
  highlights: "",
};

function normalizeItem(item, index = 0) {
  return {
    id: item.id || `item-${index}-${item.title?.toLowerCase().replace(/\s+/g, "-")}`,
    title: item.title || "Untitled Event",
    category: item.category || "Activity",
    date: item.date || "Recent",
    mediaType: item.mediaType || "image",
    media: item.media || item.image || "",
    description: item.description || "",
    highlights: Array.isArray(item.highlights) ? item.highlights : [],
  };
}

function getPageFromHash() {
  if (typeof window === "undefined") {
    return "home";
  }

  if (window.location.hash === "#activities-dashboard") {
    return "activities";
  }

  if (window.location.hash === "#events-dashboard") {
    return "events";
  }

  return "home";
}

function useEditableItems(defaultItems, storageKey) {
  const [items, setItems] = useState(() => {
    const starterItems = defaultItems.map(normalizeItem);

    if (typeof window === "undefined") {
      return starterItems;
    }

    try {
      const savedItems = window.localStorage.getItem(storageKey);
      return savedItems ? JSON.parse(savedItems).map(normalizeItem) : starterItems;
    } catch {
      return starterItems;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      // Large videos can exceed localStorage; hosted media URLs are safer for long clips.
    }
  }, [items, storageKey]);

  const resetItems = () => {
    setItems(defaultItems.map(normalizeItem));
  };

  return [items, setItems, resetItems];
}

function Header({ currentPage, onNavigate }) {
  const [open, setOpen] = useState(false);

  const handleNavigate = (event, item) => {
    event.preventDefault();
    onNavigate(item);
    setOpen(false);
  };

  return (
    <motion.header
      className="site-header"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={(event) => handleNavigate(event, "Home")}>
          <span>{profile.initials}</span>
          {profile.name}
        </a>

        <button
          className="icon-button menu-button"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <ul className={open ? "nav-links active" : "nav-links"}>
          {navItems.map((item) => (
            <li key={item}>
              <a
                className={currentPage === item.toLowerCase() ? "active" : ""}
                href={
                  item === "Activities"
                    ? "#activities-dashboard"
                    : item === "Events"
                      ? "#events-dashboard"
                      : `#${item.toLowerCase()}`
                }
                onClick={(event) => handleNavigate(event, item)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}

function SectionTitle({ label, title, text }) {
  return (
    <motion.div
      className="section-title"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </motion.div>
  );
}

function MediaFrame({ item, className = "media-image" }) {
  const media = item.media || item.image;

  return (
    <div className={className}>
      {media ? (
        item.mediaType === "video" ? (
          <video src={media} controls muted playsInline preload="metadata" />
        ) : (
          <img src={media} alt={`${item.title} visual`} loading="lazy" />
        )
      ) : (
        <div className="media-placeholder">
          <Image size={28} />
          <span>Add photo or video</span>
        </div>
      )}
      {item.category ? <span>{item.category}</span> : null}
    </div>
  );
}

function MediaShowcase({ eyebrow, title, text, items, id, variant = "standard" }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id={id} className={`section media-section ${variant}`}>
      <SectionTitle label={eyebrow} title={title} text={text} />

      <motion.div
        className="media-grid"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.16 }}
      >
        {items.map((item) => (
          <motion.article
            className="media-card"
            key={item.title}
            variants={fadeUp}
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -10, rotateX: 3, rotateY: 3, scale: 1.012 }
            }
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
          >
            <MediaFrame item={item} />
            <div className="media-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function DashboardGateway({ onOpen, activityCount, eventCount }) {
  return (
    <section className="section dashboard-gateway">
      <SectionTitle
        label="Dashboards"
        title="Open detailed activity and event pages"
        text="Manage co-curricular activities and technical events in focused dashboard pages with photos, videos, and descriptions."
      />

      <div className="gateway-grid">
        <motion.button
          className="gateway-card"
          type="button"
          onClick={() => onOpen("Activities")}
          whileHover={{ y: -8, rotateX: 3 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
        >
          <Camera size={28} />
          <span>{activityCount} entries</span>
          <h3>Co-curricular Dashboard</h3>
          <p>Add activities, photos, videos, and short descriptions from one place.</p>
        </motion.button>

        <motion.button
          className="gateway-card"
          type="button"
          onClick={() => onOpen("Events")}
          whileHover={{ y: -8, rotateX: -3 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
        >
          <Clapperboard size={28} />
          <span>{eventCount} entries</span>
          <h3>Technical Events Dashboard</h3>
          <p>Show workshops, seminars, hackathons, media, outcomes, and learning.</p>
        </motion.button>
      </div>
    </section>
  );
}

function DashboardPage({
  eyebrow,
  title,
  description,
  items,
  setItems,
  resetItems,
  onBack,
}) {
  const [selectedId, setSelectedId] = useState(items[0]?.id || "");
  const [ownerMode, setOwnerMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(emptyDraft);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!items.some((item) => item.id === selectedId)) {
      setSelectedId(items[0]?.id || "");
    }
  }, [items, selectedId]);

  const selectedItem = items.find((item) => item.id === selectedId) || items[0];
  const photoCount = items.filter((item) => item.mediaType !== "video").length;
  const videoCount = items.filter((item) => item.mediaType === "video").length;

  const updateDraft = (event) => {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
  };

  const startAdd = () => {
    setEditingId(null);
    setDraft(emptyDraft);
    setOwnerMode(true);
    setNotice("");
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setDraft({
      title: item.title,
      category: item.category,
      date: item.date,
      mediaType: item.mediaType,
      media: item.media,
      description: item.description,
      highlights: item.highlights.join(", "),
    });
    setOwnerMode(true);
    setNotice("");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setDraft((current) => ({
        ...current,
        media: reader.result,
        mediaType: file.type.startsWith("video/") ? "video" : "image",
      }));
      setNotice("Media selected. Use smaller files or hosted links for longer videos.");
    };
    reader.readAsDataURL(file);
  };

  const saveItem = (event) => {
    event.preventDefault();

    const nextItem = normalizeItem({
      ...draft,
      id: editingId || `manual-${Date.now()}`,
      highlights: draft.highlights
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    });

    setItems((current) =>
      editingId
        ? current.map((item) => (item.id === editingId ? nextItem : item))
        : [nextItem, ...current],
    );
    setSelectedId(nextItem.id);
    setEditingId(null);
    setDraft(emptyDraft);
    setNotice("Saved in this browser. For online private editing, connect a backend later.");
  };

  const deleteItem = (itemId) => {
    setItems((current) => current.filter((item) => item.id !== itemId));
    setNotice("Entry removed from this browser.");
  };

  return (
    <main className="dashboard-page">
      <section className="section dashboard-hero">
        <button className="button ghost compact" type="button" onClick={onBack}>
          <ArrowLeft size={18} />
          Back to portfolio
        </button>

        <div className="dashboard-hero-grid">
          <div>
            <p className="eyebrow">
              <LayoutDashboard size={16} />
              {eyebrow}
            </p>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>

          <div className="dashboard-stats">
            <div>
              <strong>{items.length}</strong>
              <span>Total entries</span>
            </div>
            <div>
              <strong>{photoCount}</strong>
              <span>Photos</span>
            </div>
            <div>
              <strong>{videoCount}</strong>
              <span>Videos</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section dashboard-workspace">
        {selectedItem ? (
          <motion.article
            className="dashboard-detail"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <MediaFrame item={selectedItem} className="detail-media" />
            <div className="detail-copy">
              <p className="eyebrow">{selectedItem.date}</p>
              <h2>{selectedItem.title}</h2>
              <p>{selectedItem.description}</p>
              {selectedItem.highlights.length ? (
                <div className="highlight-list">
                  {selectedItem.highlights.map((highlight) => (
                    <span key={highlight}>{highlight}</span>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.article>
        ) : (
          <div className="dashboard-empty">
            <Image size={32} />
            <p>No entries yet. Open owner tools and add your first item.</p>
          </div>
        )}

        <aside className="dashboard-side">
          <div className="dashboard-toolbar">
            <button className="button primary" type="button" onClick={startAdd}>
              <Plus size={18} />
              Add item
            </button>
            <button
              className="button ghost"
              type="button"
              onClick={() => setOwnerMode((value) => !value)}
            >
              <Edit3 size={18} />
              Owner tools
            </button>
            <button className="icon-button" type="button" aria-label="Reset entries" onClick={resetItems}>
              <RotateCcw size={18} />
            </button>
          </div>

          <div className="dashboard-list">
            {items.map((item) => (
              <button
                className={selectedItem?.id === item.id ? "dashboard-list-item active" : "dashboard-list-item"}
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
              >
                {item.mediaType === "video" ? <Video size={18} /> : <Camera size={18} />}
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.category}</small>
                </span>
              </button>
            ))}
          </div>
        </aside>
      </section>

      <AnimatePresence>
        {ownerMode ? (
          <motion.section
            className="section owner-panel"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
          >
            <div className="owner-panel-header">
              <div>
                <p className="eyebrow">Manual editor</p>
                <h2>{editingId ? "Edit selected entry" : "Add a new entry"}</h2>
              </div>
              <button className="icon-button" type="button" aria-label="Close owner tools" onClick={() => setOwnerMode(false)}>
                <X size={18} />
              </button>
            </div>

            <form className="owner-form" onSubmit={saveItem}>
              <label>
                Title
                <input name="title" value={draft.title} onChange={updateDraft} placeholder="Event or activity name" required />
              </label>
              <label>
                Category
                <input name="category" value={draft.category} onChange={updateDraft} placeholder="Hackathon, workshop, sports..." required />
              </label>
              <label>
                Date or label
                <input name="date" value={draft.date} onChange={updateDraft} placeholder="2026, Workshop, College event..." />
              </label>
              <label>
                Media type
                <select name="mediaType" value={draft.mediaType} onChange={updateDraft}>
                  <option value="image">Photo</option>
                  <option value="video">Video</option>
                </select>
              </label>
              <label className="owner-form-wide">
                Photo or video URL
                <input name="media" value={draft.media} onChange={updateDraft} placeholder="Paste image/video link or upload below" />
              </label>
              <label className="upload-control">
                <Upload size={18} />
                Upload photo or video
                <input type="file" accept="image/*,video/*" onChange={handleFileUpload} />
              </label>
              <label className="owner-form-wide">
                Description
                <textarea name="description" value={draft.description} onChange={updateDraft} placeholder="Write a short description about this event..." required />
              </label>
              <label className="owner-form-wide">
                Highlights
                <input name="highlights" value={draft.highlights} onChange={updateDraft} placeholder="Leadership, teamwork, coding, presentation" />
              </label>

              <div className="owner-actions">
                <button className="button primary" type="submit">
                  <Save size={18} />
                  {editingId ? "Update item" : "Save item"}
                </button>
                {selectedItem ? (
                  <button className="button ghost" type="button" onClick={() => startEdit(selectedItem)}>
                    <Edit3 size={18} />
                    Edit selected
                  </button>
                ) : null}
                {selectedItem ? (
                  <button className="button danger" type="button" onClick={() => deleteItem(selectedItem.id)}>
                    <Trash2 size={18} />
                    Delete selected
                  </button>
                ) : null}
              </div>
              {notice ? <p className="form-status">{notice}</p> : null}
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </main>
  );
}

function App() {
  const [formStatus, setFormStatus] = useState("");
  const [page, setPage] = useState(getPageFromHash);
  const [activityItems, setActivityItems, resetActivityItems] = useEditableItems(
    coCurricularActivities,
    "portfolio-co-curricular-items",
  );
  const [eventItems, setEventItems, resetEventItems] = useEditableItems(
    technicalEvents,
    "portfolio-technical-event-items",
  );
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 28, restDelta: 0.001 });
  const heroShift = useTransform(scrollYProgress, [0, 0.35], [0, shouldReduceMotion ? 0 : -90]);

  useEffect(() => {
    const handleHashChange = () => {
      setPage(getPageFromHash());
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = (item) => {
    const target = item.toLowerCase();

    if (target === "activities" || target === "events") {
      setPage(target);
      window.history.pushState(
        null,
        "",
        target === "activities" ? "#activities-dashboard" : "#events-dashboard",
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setPage("home");
    window.history.pushState(null, "", `#${target}`);
    window.setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormStatus("Message saved locally. Connect Formspree later for real emails.");
    event.currentTarget.reset();
  };

  if (page === "activities") {
    return (
      <>
        <motion.div className="scroll-progress" style={{ scaleX }} />
        <Header currentPage={page} onNavigate={navigate} />
        <DashboardPage
          eyebrow="Co-curricular dashboard"
          title="Co-curricular activities"
          description="Add and manage activity photos, videos, categories, descriptions, and personal highlights from this dashboard."
          items={activityItems}
          setItems={setActivityItems}
          resetItems={resetActivityItems}
          onBack={() => navigate("Home")}
        />
        <footer className="site-footer">
          <p>Copyright 2026 {profile.name}. Built with React, Motion, and Three.js.</p>
        </footer>
      </>
    );
  }

  if (page === "events") {
    return (
      <>
        <motion.div className="scroll-progress" style={{ scaleX }} />
        <Header currentPage={page} onNavigate={navigate} />
        <DashboardPage
          eyebrow="Technical events dashboard"
          title="Technical events"
          description="Show hackathons, seminars, workshops, photos, videos, event descriptions, and learning outcomes in a focused page."
          items={eventItems}
          setItems={setEventItems}
          resetItems={resetEventItems}
          onBack={() => navigate("Home")}
        />
        <footer className="site-footer">
          <p>Copyright 2026 {profile.name}. Built with React, Motion, and Three.js.</p>
        </footer>
      </>
    );
  }

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Header currentPage={page} onNavigate={navigate} />

      <main>
        <section id="home" className="hero-shell">
          <Suspense fallback={<div className="three-fallback" aria-hidden="true" />}>
            <ThreeHero />
          </Suspense>
          <div className="hero-shade" />

          <motion.div className="hero-grid" style={{ y: heroShift }}>
            <motion.div
              className="hero-copy"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <motion.p className="eyebrow hero-pill" variants={fadeUp}>
                <Sparkles size={16} />
                3D Animated Portfolio
              </motion.p>
              <motion.h1 variants={fadeUp}>
                Hi, I am <span>{profile.name}</span>.
                <br />
                I design clean web experiences.
              </motion.h1>
              <motion.p className="hero-text" variants={fadeUp}>
                {profile.summary} This starter is ready for your real photo, resume,
                project links, certificates, and achievements.
              </motion.p>

              <motion.div className="hero-actions" variants={fadeUp}>
                <a className="button primary" href="#projects">
                  <MousePointer2 size={18} />
                  View Projects
                </a>
                <a className="button ghost" href="/resume.pdf">
                  <Download size={18} />
                  Resume
                </a>
              </motion.div>
            </motion.div>

            <motion.aside
              className="identity-panel"
              initial={{ opacity: 0, rotateY: -16, y: 30 }}
              animate={{ opacity: 1, rotateY: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
              whileHover={shouldReduceMotion ? undefined : { rotateY: 4, rotateX: -3, y: -8 }}
            >
              <img src={profileImage} alt={`${profile.name} profile`} />
              <div className="identity-content">
                <p>Available for opportunities</p>
                <h2>{profile.role}</h2>
                <span>{profile.location}</span>
              </div>
            </motion.aside>
          </motion.div>
        </section>

        <section id="about" className="section about-section">
          <SectionTitle
            label="About"
            title="A focused introduction that feels personal."
            text="Use this area to tell visitors who you are, what you are learning, and what type of work you want to do."
          />

          <motion.div
            className="about-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div className="about-copy" variants={fadeUp}>
              <h3>Profile</h3>
              <p>
                I am a learning-focused developer who enjoys turning ideas into
                polished web interfaces. My goal is to build projects that are useful,
                fast, responsive, and easy for people to understand.
              </p>
              <p>
                Replace this text with your education, current course, college name,
                strengths, career target, and the kind of projects you want to showcase.
              </p>
            </motion.div>

            <motion.div className="stats-grid" variants={stagger}>
              {stats.map((item) => (
                <motion.div className="stat-item" key={item.label} variants={fadeUp}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section id="skills" className="section dark-band">
          <SectionTitle
            label="Skills"
            title="Tools and technologies"
            text="A compact skills system that looks professional and stays readable on mobile."
          />

          <motion.div
            className="skills-cloud"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {skills.map((skill) => (
              <motion.span
                key={skill}
                variants={fadeUp}
                whileHover={shouldReduceMotion ? undefined : { y: -6, rotateZ: -1.5, scale: 1.04 }}
              >
                <Code2 size={16} />
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </section>

        <section id="projects" className="section projects-section">
          <SectionTitle
            label="Projects"
            title="Featured project work"
            text="Each project card has a 3D hover feel, stack labels, and clean action links."
          />

          <motion.div
            className="project-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
          >
            {projects.map((project) => (
              <motion.article
                className="project-card"
                key={project.name}
                variants={fadeUp}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -12, rotateX: 4, rotateY: -4, scale: 1.015 }
                }
                transition={{ type: "spring", stiffness: 210, damping: 18 }}
              >
                <div className="project-meta">
                  <span>{project.type}</span>
                  <ArrowUpRight size={18} />
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="stack-list">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="project-actions">
                  <a href={project.github}>
                    <GitBranch size={18} />
                    Code
                  </a>
                  <a href={project.live}>
                    <ArrowUpRight size={18} />
                    Live
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <DashboardGateway
          activityCount={activityItems.length}
          eventCount={eventItems.length}
          onOpen={navigate}
        />

        <section id="timeline" className="section timeline-section">
          <SectionTitle
            label="Timeline"
            title="My development path"
            text="Show your education, learning journey, internship experience, certificates, or achievements here."
          />

          <div className="timeline">
            {timeline.map((item, index) => (
              <motion.article
                className="timeline-item"
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -32 : 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <span>{item.year}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <SectionTitle
            label="Contact"
            title="Let us build something useful."
            text="Keep your contact area direct. Recruiters and collaborators should know exactly how to reach you."
          />

          <div className="contact-grid">
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
            >
              <a href={`mailto:${profile.email}`}>
                <Mail size={20} />
                {profile.email}
              </a>
              <a href={profile.github}>
                <GitBranch size={20} />
                GitHub
              </a>
              <a href={profile.linkedin}>
                <Link2 size={20} />
                LinkedIn
              </a>
            </motion.div>

            <motion.form
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
            >
              <label>
                Name
                <input name="name" type="text" placeholder="Enter your name" required />
              </label>
              <label>
                Email
                <input name="email" type="email" placeholder="Enter your email" required />
              </label>
              <label>
                Message
                <textarea name="message" placeholder="Write your message" required />
              </label>
              <button className="button primary" type="submit">
                <Mail size={18} />
                Send Message
              </button>
              <AnimatePresence>
                {formStatus ? (
                  <motion.p
                    className="form-status"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    role="status"
                  >
                    {formStatus}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </motion.form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Copyright 2026 {profile.name}. Built with React, Motion, and Three.js.</p>
      </footer>
    </>
  );
}

export default App;
