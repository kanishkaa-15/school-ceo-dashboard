pipeline {
    agent any

    environment {
        GHCR_USER       = "kanishkaa-15"
        DOCKER_REGISTRY = "ghcr.io/${GHCR_USER}"
        IMAGE_BACKEND   = "${DOCKER_REGISTRY}/school-ceo-backend"
        IMAGE_FRONTEND  = "${DOCKER_REGISTRY}/school-ceo-frontend"
        IMAGE_TAG       = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo '📥 Checking out source code...'
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/kanishkaa-15/school-ceo-dashboard.git',
                        credentialsId: 'ghcr-credentials1'
                    ]]
                ])
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Frontend Deps') {
                    steps {
                        echo '📦 Installing frontend dependencies...'
                        sh 'npm install'
                    }
                }
                stage('Backend Deps') {
                    steps {
                        echo '📦 Installing backend dependencies...'
                        sh 'cd backend && npm install'
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo '🏗️  Building Next.js frontend...'
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            parallel {
                stage('Build Backend Image') {
                    steps {
                        echo '🐳 Building backend Docker image...'
                        sh "docker build -t ${IMAGE_BACKEND}:${IMAGE_TAG} ./backend"
                        sh "docker tag ${IMAGE_BACKEND}:${IMAGE_TAG} ${IMAGE_BACKEND}:latest"
                    }
                }
                stage('Build Frontend Image') {
                    steps {
                        echo '🐳 Building frontend Docker image...'
                        sh "docker build -t ${IMAGE_FRONTEND}:${IMAGE_TAG} ."
                        sh "docker tag ${IMAGE_FRONTEND}:${IMAGE_TAG} ${IMAGE_FRONTEND}:latest"
                    }
                }
            }
        }

        // Jenkins credential 'ghcr-token':
        //   Type     : Username with password
        //   Username : kanishkaa-15  (your exact GitHub username)
        //   Password : <GitHub PAT with write:packages + read:packages scopes>
        stage('Docker Push') {
            steps {
                echo '📤 Pushing images to GitHub Container Registry...'
                withCredentials([usernamePassword(
                    credentialsId: 'ghcr-credentials1',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    // Username hardcoded to kanishkaa-15 to avoid mismatch from credential field
                    sh 'echo "$DOCKER_PASS" | docker login ghcr.io -u kanishkaa-15 --password-stdin'
                    sh "docker push ${IMAGE_BACKEND}:${IMAGE_TAG}"
                    sh "docker push ${IMAGE_BACKEND}:latest"
                    sh "docker push ${IMAGE_FRONTEND}:${IMAGE_TAG}"
                    sh "docker push ${IMAGE_FRONTEND}:latest"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo '☸️  Deploying to Kubernetes cluster...'
                sh """
                    # kubectl installed at /var/jenkins_home/kubectl inside Jenkins container
                    export KUBECTL=/var/jenkins_home/kubectl

                    \$KUBECTL version --client || { echo '❌ kubectl not found'; exit 1; }

                    (sed -i '' 's|school-ceo-backend:latest|${IMAGE_BACKEND}:${IMAGE_TAG}|g' k8s/backend.yaml 2>/dev/null) || sed -i 's|school-ceo-backend:latest|${IMAGE_BACKEND}:${IMAGE_TAG}|g' k8s/backend.yaml
                    (sed -i '' 's|school-ceo-frontend:latest|${IMAGE_FRONTEND}:${IMAGE_TAG}|g' k8s/frontend.yaml 2>/dev/null) || sed -i 's|school-ceo-frontend:latest|${IMAGE_FRONTEND}:${IMAGE_TAG}|g' k8s/frontend.yaml

                    \$KUBECTL apply -f k8s/
                    \$KUBECTL rollout status deployment/backend  --timeout=120s
                    \$KUBECTL rollout status deployment/frontend --timeout=120s
                """
            }
        }

    }

    post {
        always {
            echo '🧹 Cleaning workspace...'
            cleanWs()
        }
        success {
            echo "✅ Pipeline #${BUILD_NUMBER} completed successfully!"
        }
        failure {
            echo "❌ Pipeline #${BUILD_NUMBER} failed. Check the console logs above."
        }
    }
}
