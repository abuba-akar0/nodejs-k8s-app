# 🚀 Node.js Web Application — Deployed on AWS with Docker & Kubernetes

> **Course:** Cloud Computing (BS CS) — CS-412  
> **Institution:** Riphah International University  
> **Deployment:** AWS Free Tier · Docker · Kubernetes (Minikube on EC2)  
> **Live URL:** `http://3.95.252.174:30080`

---

## 📌 Project Overview

This project demonstrates a complete **end-to-end cloud deployment pipeline** for a Node.js web application — from local development to a publicly accessible Kubernetes cluster running entirely within AWS Free Tier limits. No payment required at any stage.

The application displays real-time dynamic information including a live timestamp, container ID, and a visitor counter — all served from a containerized Node.js server running inside a Kubernetes pod on a single EC2 t2.micro instance.

---

## 🌐 Live Application

| Endpoint | URL | Description |
|----------|-----|-------------|
| Main App | `http://3.95.252.174:30080` | Displays timestamp, container ID, visitor count |
| Health Check | `http://3.95.252.174:30080/health` | Returns JSON health status and uptime |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Developer Laptop                     │
│  Node.js App → Dockerfile → docker build → docker push  │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│               Amazon ECR (Container Registry)            │
│         123456789.dkr.ecr.us-east-1.amazonaws.com       │
└──────────────────────────┬──────────────────────────────┘
                           │ docker pull
                           ▼
┌─────────────────────────────────────────────────────────┐
│              AWS EC2 t2.micro (Free Tier)                │
│  ┌───────────────────────────────────────────────────┐  │
│  │           Minikube (Single-Node Kubernetes)        │  │
│  │  ┌─────────────────┐   ┌─────────────────────┐   │  │
│  │  │   Pod (nodejs)   │   │  NodePort Service   │   │  │
│  │  │  port: 3000     │◄──│  port: 30080        │   │  │
│  │  └─────────────────┘   └──────────┬──────────┘   │  │
│  └─────────────────────────────────── │ ─────────────┘  │
└──────────────────────────────────────│─────────────────┘
                                       │
                                       ▼
                            Public Internet
                       http://3.95.252.174:30080
```

---

## 📁 Repository Structure

```
nodejs-k8s-app/
│
├── app.js                  # Main Node.js Express application
├── package.json            # Node.js project metadata and dependencies
├── package-lock.json       # Locked dependency versions
│
├── Dockerfile              # Docker image build instructions
├── .dockerignore           # Files excluded from Docker image
│
├── deployment.yaml         # Kubernetes Deployment manifest
├── service.yaml            # Kubernetes Service (NodePort) manifest
│
├── .gitignore              # Files excluded from Git tracking
└── README.md               # Project documentation (this file)
```

---

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18 LTS | Application runtime |
| Express.js | ^4.x | Web framework |
| Docker | 24.x | Containerization |
| Kubernetes | 1.28+ | Container orchestration |
| Minikube | Latest | Single-node K8s cluster |
| Amazon ECR | — | Container image registry |
| Amazon EC2 | t2.micro | Cloud virtual machine (Free Tier) |
| Ubuntu | 22.04 LTS | EC2 operating system |

---

## 🚀 Deployment Pipeline

### Phase 1 — Local Development
```bash
# Install dependencies
npm install

# Run locally
node app.js
# Visit: http://localhost:3000
```

### Phase 2 — Containerize with Docker
```bash
# Build Docker image
docker build -t nodejs-k8s-app .

# Test locally
docker run -p 3000:3000 nodejs-k8s-app
```

### Phase 3 — Push to Amazon ECR
```bash
# Authenticate Docker to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com

# Tag and push
docker tag nodejs-k8s-app:latest <ECR_URI>/nodejs-k8s-app:latest
docker push <ECR_URI>/nodejs-k8s-app:latest
```

### Phase 4 — Deploy to Kubernetes (on EC2)
```bash
# Pull image into Minikube's Docker environment
eval $(minikube docker-env)
docker pull <ECR_URI>/nodejs-k8s-app:latest
docker tag <ECR_URI>/nodejs-k8s-app:latest nodejs-k8s-app:latest

# Apply Kubernetes manifests
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Verify deployment
kubectl get pods
kubectl get services

# Expose to public internet
kubectl port-forward service/nodejs-service 30080:3000 --address 0.0.0.0 &
```

### Phase 5 — Scale the Application
```bash
# Scale to 2 replicas
kubectl scale deployment nodejs-app --replicas=2

# Verify
kubectl get pods
```

---

## ☸️ Kubernetes Manifests

### Deployment (`deployment.yaml`)
Defines 1 replica of the Node.js container using the local Docker image with `imagePullPolicy: Never` since the image is loaded directly into Minikube.

### Service (`service.yaml`)
Exposes the deployment externally via a **NodePort** on port `30080`, routing traffic to the container's port `3000`.

---

## 💰 Cost Analysis — Why This is $0

| Resource | Free Tier Allowance | Usage | Cost |
|----------|--------------------|---------|----|
| EC2 t2.micro | 750 hours/month | ~1 instance | **$0** |
| Amazon ECR | 500 MB/month storage | ~50 MB image | **$0** |
| EBS Storage | 30 GB/month | 20 GB volume | **$0** |
| Data Transfer | 15 GB/month outbound | Minimal | **$0** |
| Minikube | Free open-source software | — | **$0** |
| **Total** | | | **$0** |

---

## 🔧 Prerequisites

To run this project yourself you need:

- AWS Account (Free Tier) — [aws.amazon.com/free](https://aws.amazon.com/free)
- Node.js 18+ — [nodejs.org](https://nodejs.org)
- Docker Desktop — [docker.com](https://docker.com/products/docker-desktop)
- AWS CLI v2 — [aws.amazon.com/cli](https://aws.amazon.com/cli)
- Git — [git-scm.com](https://git-scm.com)

---

## 📋 Deliverables

| # | Deliverable | Status |
|---|-------------|--------|
| 1 | Public Application URL |  `http://3.95.252.174:30080` |
| 2 | Source Code Repository |  This repository |
| 3 | Project Report (PDF) |  Submitted via Moellim |
| 4 | Demonstration Video |  Linked below |
| 5 | Screenshots |  Embedded in report |

**Demonstration Video:** [Watch on YouTube](<YOUTUBE-LINK-HERE>)

---

## 👨‍💻 Author

**Abubakar Ahmad**  
**54603**
BS Computer Science  
Riphah International University  
Course: Cloud Computing (CS-412)

---

## 📄 License

This project is submitted as academic coursework for Riphah International University. All rights reserved.