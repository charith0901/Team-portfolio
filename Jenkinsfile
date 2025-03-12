pipeline {
    agent any

    environment {
        SERVER_IP = '128.199.214.198'
        SERVER_USER = 'root'
        DEPLOY_PATH = '/var/www/web/team-portfolio'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/charith0901/Team-portfolio.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Server') {
            steps {
                sshagent(credentials: ['abc264ad-bfca-427a-9d14-a0fc7e32958c']) {
                    sh '''
                        set -e  # Stop on error
                        echo "Connecting to server..."
                        ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "echo 'Connected successfully!'"
                        ssh $SERVER_USER@$SERVER_IP "mkdir -p $DEPLOY_PATH"
                        rsync -avz --delete dist/ $SERVER_USER@$SERVER_IP:$DEPLOY_PATH/
                        ssh $SERVER_USER@$SERVER_IP "pm2 restart all"
                    '''
                }
            }
        }
    }
}
