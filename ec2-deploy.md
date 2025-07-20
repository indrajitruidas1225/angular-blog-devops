
#  Deploying Angular Blog App to AWS EC2 with Docker Compose

This guide walks through deploying an Angular frontend and a JSON Server backend to an AWS EC2 instance using Docker Compose.

---

## 🔧 Prerequisites

- AWS Account
- SSH key pair (.pem file)
- Docker & Docker Compose installed on EC2 instance
- Your app is already Dockerized and includes a `docker-compose.yml`

---

## 1 Create an EC2 Instance

1. **Go to** AWS Management Console → EC2 → Launch Instance.
2. **Choose AMI**: Select **Ubuntu Server 22.04 LTS**.
3. **Instance Type**: Choose `t2.micro` (Free Tier eligible).
4. **Key Pair (login)**:
   - Select existing or create a new key pair.
   - Download the `.pem` file and store it securely.
5. **Network Settings**:
   - Allow SSH (port 22)
   - ➕ Add Custom TCP Rule:
     - Type: Custom TCP | Port: `8080` | Source: `0.0.0.0/0` (for Angular UI)
     - Type: Custom TCP | Port: `3000` | Source: `0.0.0.0/0` (for backend)
   - (Optional) Add HTTP (port 80) if needed.
   - Click **Save rules**
6. **Launch instance**

---

## 2 Connect to the EC2 Instance

```bash
chmod 400 angularBlog.pem  # secure your key
ssh -i angularBlog.pem ubuntu@<EC2_PUBLIC_IP>
````

> Replace `<EC2_PUBLIC_IP>` with your EC2 instance's public IPv4 address.

---

## 3 Install Docker & Docker Compose

```bash
# Update and install Docker
sudo apt update && sudo apt install docker.io -y

# Install Docker Compose plugin
sudo apt install docker-compose -y

# Enable and start Docker
sudo systemctl enable docker
sudo systemctl start docker
```

---

## 4 Upload Your Project to EC2

You can either:

### Option A: Clone from GitHub

```bash
git clone https://github.com/your-username/angular-blog-devops.git
cd angular-blog-devops
```

> Make sure your repo includes a `Dockerfile` and `docker-compose.yml`.

### Option B: Use `scp` to copy local files

```bash
scp -i angularBlog.pem -r ./angular-blog-devops ubuntu@<EC2_PUBLIC_IP>:~/
```

---

## 5 Run the Docker Compose Setup

```bash
cd angular-blog-devops
sudo docker-compose up -d
```

This launches:

* Frontend: accessible on port `8080`
* Backend: JSON server on port `3000`

---

## Access the App in Browser

* **Frontend**: [http://\<EC2\_PUBLIC\_IP>:8080](http://<EC2_PUBLIC_IP>:8080)
* **Backend API**: [http://\<EC2\_PUBLIC\_IP>:3000](http://<EC2_PUBLIC_IP>:3000)

---

## 🛠 Troubleshooting

***Permission error for `.pem` file**:

  * Run `chmod 400 your-key.pem`

***Timeout or unreachable site**:

  * Make sure security group has ports 8080 and 3000 open.
  * Don’t forget to click **"Save rules"** after adding them.

---

## Useful Commands

```bash
# See running containers
docker ps

# Stop all containers
docker stop $(docker ps -q)

# Restart containers
docker-compose restart

# Rebuild and start fresh
docker-compose down
docker-compose up --build -d
```

---

## Clean Up

To stop everything and clean resources:

```bash
docker-compose down
```

---

## Notes

* If you want to serve the frontend on port `80`, map port 80 in `docker-compose.yml` and expose it in EC2.
* Make sure your Angular build is production-ready (`ng build --prod`).
