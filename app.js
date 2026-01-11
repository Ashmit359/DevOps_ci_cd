const express = require('express')
const os = require('os')
const app = express()
const port = 8080

// Serve static files (video, images, css, js)
app.use(express.static('public'))

// Middleware for parsing form data (for contact form)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const meta = {
  host: os.hostname(),
  env: process.env.NODE_ENV || 'production',
  pipeline: process.env.CI_PIPELINE_ID || 'local',
  commit: process.env.CI_COMMIT_SHORT_SHA || 'dev',
  time: new Date().toLocaleString()
}

// Enhanced layout with meta description, favicon, and script inclusion
const layout = (title, description, content, includeScript = false) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="/favicon.ico" type="image/x-icon">

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Poppins', sans-serif;
  background: #0b0f19;
  color: #e5e7eb;
  line-height: 1.6;
}

nav {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(11,15,25,.9);
  backdrop-filter: blur(10px);
  padding: 18px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  color: #38bdf8;
  margin-left: 20px;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

nav a:hover { color: #7dd3fc; }

.hero {
  height: 90vh;
  position: relative;
  overflow: hidden;
}

.hero video {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,.35), #0b0f19);
}

.hero-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 60px;
}

.hero h1 {
  font-size: 3.2rem;
  line-height: 1.2;
  animation: fadeInUp 1s ease-out;
}

.hero p {
  max-width: 600px;
  margin-top: 20px;
  font-size: 1.1rem;
  opacity: .9;
  animation: fadeInUp 1.2s ease-out;
}

.section {
  padding: 80px 60px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
}

.card {
  background: linear-gradient(145deg,#111827,#020617);
  padding: 30px;
  border-radius: 18px;
  transition: transform .3s, box-shadow .3s;
  text-align: center;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(0,0,0,.6);
}

.card h3 {
  color: #38bdf8;
  margin-bottom: 12px;
}

.card p {
  margin-top: 10px;
  font-size: 0.9rem;
  opacity: 0.8;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  background: #38bdf8;
  color: #0b0f19;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.3s;
}

.btn:hover { background: #7dd3fc; }

form {
  max-width: 500px;
  margin: 0 auto;
  background: linear-gradient(145deg,#111827,#020617);
  padding: 30px;
  border-radius: 18px;
}

form input, form textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: none;
  border-radius: 8px;
  background: #1f2937;
  color: #e5e7eb;
}

form button {
  width: 100%;
  padding: 12px;
  background: #38bdf8;
  color: #0b0f19;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

footer {
  padding: 40px;
  text-align: center;
  font-size: .85rem;
  opacity: .7;
  background: rgba(11,15,25,.5);
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@media(max-width:768px){
  .hero h1 { font-size: 2rem; }
  .hero-content, .section { padding: 40px 20px; }
  nav { flex-direction: column; }
}
</style>
</head>

<body>

<nav>
  <strong>🚀 Ashmit | DevOps Platform</strong>
  <div>
    <a href="/">Home</a>
    <a href="/cicd">CI/CD</a>
    <a href="/monitoring">Monitoring</a>
    <a href="/cloud">Cloud</a>
    <a href="/contact">Contact</a>
  </div>
</nav>

${content}

<footer>
  Enterprise DevOps Platform • CI/CD • Cloud • Observability • Automation<br>
  Built on ${meta.time} | Env: ${meta.env} | Commit: ${meta.commit}
</footer>

${includeScript ? '<script src="/script.js"></script>' : ''}
</body>
</html>
`

// HOME - Enhanced with more details and a call-to-action
app.get('/', (req, res) => {
  res.send(layout('Home - Ashmit Kumar Sinha', 'Enterprise DevOps CI/CD Platform by Ashmit Kumar Sinha', `
<section class="hero">
  <video autoplay muted loop playsinline>
    <source src="/video.mp4" type="video/mp4">
  </video>
  <div class="overlay"></div>

  <div class="hero-content">
    <div>
      <h1>Enterprise DevOps<br>CI/CD Platform</h1>
      <p>
        Production-grade CI/CD pipelines, cloud automation,
        monitoring and enterprise DevOps practices. Delivering scalable solutions for modern infrastructure.
      </p>
      <a href="/contact" class="btn">Get In Touch</a>
    </div>
  </div>
</section>

<section class="section">
  <h2 style="text-align: center; margin-bottom: 40px; color: #38bdf8;">Key Services</h2>
  <div class="grid">
    <div class="card">
      <h3>CI/CD Automation</h3>
      <p>GitLab CI pipelines, Docker builds, secure deployments, rollback & version control.</p>
    </div>
    <div class="card">
      <h3>Monitoring & Observability</h3>
      <p>Prometheus metrics, Grafana dashboards, centralized logging & alerting.</p>
    </div>
    <div class="card">
      <h3>Cloud Architecture</h3>
      <p>AWS networking, IAM security, cost-optimized & scalable designs.</p>
    </div>
  </div>
</section>
`, true))
})

// CI/CD - Enhanced with more cards and details
app.get('/cicd', (req, res) => {
  res.send(layout('CI/CD - Ashmit Kumar Sinha', 'CI/CD Engineering services including pipelines, Docker, and deployment strategies', `
<section class="section">
  <h1>CI/CD Engineering</h1>
  <p style="text-align: center; margin-bottom: 40px;">Streamlining development with automated pipelines and best practices.</p>
  <div class="grid">
    <div class="card">
      <h3>Multi-stage GitLab Pipelines</h3>
      <p>Automated testing, building, and deployment across environments.</p>
    </div>
    <div class="card">
      <h3>Docker Image Versioning</h3>
      <p>Containerization for consistent and portable applications.</p>
    </div>
    <div class="card">
      <h3>Blue-Green & Rollback Strategies</h3>
      <p>Zero-downtime deployments with instant rollback capabilities.</p>
    </div>
    <div class="card">
      <h3>Security Scanning</h3>
      <p>Integrated vulnerability checks in CI pipelines.</p>
    </div>
    <div class="card">
      <h3>Artifact Management</h3>
      <p>Versioned builds and efficient artifact storage.</p>
    </div>
  </div>
</section>
`))
})

// MONITORING - Enhanced with more details
app.get('/monitoring', (req, res) => {
  res.send(layout('Monitoring - Ashmit Kumar Sinha', 'Monitoring and Observability solutions with Prometheus, Grafana, and logging', `
<section class="section">
  <h1>Monitoring & Observability</h1>
  <p style="text-align: center; margin-bottom: 40px;">Ensuring system reliability with real-time insights and alerting.</p>
  <div class="grid">
    <div class="card">
      <h3>Prometheus Metrics Endpoints</h3>
      <p>Custom metrics collection for application and infrastructure monitoring.</p>
    </div>
    <div class="card">
      <h3>Grafana Dashboards & SLOs</h3>
      <p>Visual dashboards with service level objectives for performance tracking.</p>
    </div>
    <div class="card">
      <h3>Loki Centralized Logging</h3>
      <p>Efficient log aggregation and querying for troubleshooting.</p>
    </div>
    <div class="card">
      <h3>Alerting Systems</h3>
      <p>Automated notifications via Slack, PagerDuty, and email.</p>
    </div>
    <div class="card">
      <h3>Tracing & APM</h3>
      <p>Distributed tracing with tools like Jaeger for request flow analysis.</p>
    </div>
  </div>
</section>
`))
})

// CLOUD - Enhanced with more services
app.get('/cloud', (req, res) => {
  res.send(layout('Cloud - Ashmit Kumar Sinha', 'Cloud Architecture services including AWS, Terraform, and infrastructure as code', `
<section class="section">
  <h1>Cloud Architecture</h1>
  <p style="text-align: center; margin-bottom: 40px;">Designing secure, scalable, and cost-effective cloud solutions.</p>
  <div class="grid">
    <div class="card">
      <h3>AWS EC2, VPC, IAM, S3</h3>
      <p>Core AWS services for compute, networking, security, and storage.</p>
    </div>
    <div class="card">
      <h3>Terraform & IaC</h3>
      <p>Infrastructure as code for automated provisioning and management.</p>
    </div>
    <div class="card">
      <h3>Security & Cost Optimization</h3>
      <p>Best practices for compliance, encryption, and budget control.</p>
    </div>
    <div class="card">
      <h3>Serverless & Microservices</h3>
      <p>Lambda, API Gateway, and container orchestration with EKS.</p>
    </div>
    <div class="card">
      <h3>Multi-Cloud Strategies</h3>
      <p>Hybrid and multi-cloud deployments for flexibility.</p>
    </div>
  </div>
</section>
`))
})

// CONTACT - New page with a form (replaces About for 5 pages: Home, CI/CD, Monitoring, Cloud, Contact)
app.get('/contact', (req, res) => {
  res.send(layout('Contact - Ashmit Kumar Sinha', 'Get in touch with Ashmit Kumar Sinha for DevOps consulting and services', `
<section class="section">
  <h1>Contact Me</h1>
  <p style="text-align: center; margin-bottom: 40px;">Let's discuss your DevOps needs. Reach out for consultations, projects, or collaborations.</p>
  <form action="/submit-contact" method="POST">
    <input type="text" name="name" placeholder="Your Name" required>
    <input type="email" name="email" placeholder="Your Email" required>
    <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
    <button type="submit">Send Message</button>
  </form>
  <div class="grid" style="margin-top: 40px;">
    <div class="card">
      <h3>Email</h3>
      <p>ashmitsinha359@gamil.com</p>
    </div>
    <div class="card">
      <h3>LinkedIn</h3>
      <p><a href="https://www.linkedin.com/in/ashmit-sinha-372115b0/" class="btn">Connect</a></p>
    </div>
    <div class="card">
      <h3>GitHub</h3>
      <p><a href="https://github.com/Ashmit359" class="btn">View Profile</a></p>
    </div>
  </div>
</section>
`))
})

// Handle contact form submission
app.post('/submit-contact', (req, res) => {
  const { name, email, message } = req.body
  // In a real app, send email or save to DB. For now, log and redirect.
  console.log(`New contact: ${name} (${email}) - ${message}`)
  res.send(layout('Thank You', 'Thank you for your message', `
<section class="section">
  <h1>Thank You!</h1>
  <p>Your message has been sent. I'll get back to you soon.</p>
  <a href="/" class="btn">Back to Home</a>
</section>
`))
})

// HEALTH CHECK - Unchanged
app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    service: 'enterprise-devops-portfolio',
    env: meta.env,
    host: meta.host,
    time: meta.time
  })
})

// 404 Handler
app.use((req, res) => {
  res.status(404).send(layout('404 - Page Not Found', 'The page you are looking for does not exist', `
<section class="section">
  <h1>404 - Page Not Found</h1>
  <p>The page you're looking for doesn't exist. <a href="/" style="color: #38bdf8;">Go back home</a>.</p>
</section>
`))
})

// Error Handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send(layout('500 - Internal Server Error', 'Something went wrong on our end', `
<section class="section">
  <h1>500 - Internal Server Error</h1>
  <p>Sorry, something went wrong. Please try again later.</p>
</section>
`))
})

app.listen(port, () => {
  console.log(`🚀 DevOps Portfolio running on http://localhost:${port}`)
})