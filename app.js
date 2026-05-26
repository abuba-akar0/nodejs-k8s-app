const express = require('express');
const os = require('os');
const app = express();

let visitorCount = 0;

app.get('/', (req, res) => {
  visitorCount++;
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Cloud Computing Project</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Segoe UI', sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .card {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 24px;
          padding: 48px 40px;
          max-width: 700px;
          width: 100%;
          box-shadow: 0 25px 60px rgba(0,0,0,0.5);
          color: white;
        }

        .badge {
          display: inline-block;
          background: linear-gradient(90deg, #667eea, #764ba2);
          color: white;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 20px;
          margin-bottom: 20px;
        }

        h1 {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 6px;
          background: linear-gradient(90deg, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          color: rgba(255,255,255,0.5);
          font-size: 0.95rem;
          margin-bottom: 36px;
        }

        .section-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 14px;
          margin-top: 28px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .info-box {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 16px 20px;
        }

        .info-box .label {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }

        .info-box .value {
          font-size: 1rem;
          font-weight: 600;
          color: #e2e8f0;
        }

        .info-box.accent {
          background: linear-gradient(135deg, rgba(102,126,234,0.2), rgba(118,75,162,0.2));
          border-color: rgba(167,139,250,0.3);
        }

        .info-box.accent .value {
          color: #a78bfa;
        }

        .live-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
        }

        .live-box {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 16px;
          text-align: center;
        }

        .live-box .icon {
          font-size: 1.6rem;
          margin-bottom: 8px;
        }

        .live-box .label {
          font-size: 10px;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }

        .live-box .value {
          font-size: 0.85rem;
          font-weight: 600;
          color: #60a5fa;
          word-break: break-all;
        }

        .footer {
          margin-top: 32px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: rgba(255,255,255,0.3);
        }

        .status-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: #4ade80;
          border-radius: 50%;
          margin-right: 6px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      </style>
    </head>
    <body>
      <div class="card">

        <div class="badge">🚀 Kubernetes Deployment</div>
        <h1>Cloud Computing Project</h1>
        <p class="subtitle">Node.js · Docker · AWS ECR · Minikube · Kubernetes</p>

        <div class="section-title">Student Information</div>
        <div class="info-grid">
          <div class="info-box accent">
            <div class="label">Student Name</div>
            <div class="value">Abubakar Ahmad</div>
          </div>
          <div class="info-box accent">
            <div class="label">SAP ID</div>
            <div class="value">54603</div>
          </div>
          <div class="info-box">
            <div class="label">Course</div>
            <div class="value">Cloud Computing</div>
          </div>
          <div class="info-box">
            <div class="label">Deployment Platform</div>
            <div class="value">AWS EC2 + Kubernetes</div>
          </div>
        </div>

        <div class="section-title">Live Container Info</div>
        <div class="live-grid">
          <div class="live-box">
            <div class="icon">🕐</div>
            <div class="label">Timestamp</div>
            <div class="value">${new Date().toISOString()}</div>
          </div>
          <div class="live-box">
            <div class="icon">📦</div>
            <div class="label">Container ID</div>
            <div class="value">${os.hostname()}</div>
          </div>
          <div class="live-box">
            <div class="icon">👥</div>
            <div class="label">Visitors</div>
            <div class="value" style="font-size:1.4rem; color:#4ade80;">${visitorCount}</div>
          </div>
        </div>

        <div class="footer">
          <span><span class="status-dot"></span>Running healthy</span>
          <span>Node.js ${process.version} on ${os.platform()}</span>
        </div>

      </div>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});