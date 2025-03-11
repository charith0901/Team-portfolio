pipeline {
    agent any

    environment {
        SERVER_IP = '128.199.214.198'
        SERVER_USER = 'root'
        DEPLOY_PATH = '/var/www/team-portfolio'
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
                sshagent(credentials: ['65458e70-7153-494d-a419-6daba9da3f34']) {
                    sh """
                        ssh $SERVER_USER@$SERVER_IP 'mkdir -p $DEPLOY_PATH'
                        rsync -avz --delete dist/ $SERVER_USER@$SERVER_IP:$DEPLOY_PATH/
                        ssh $SERVER_USER@$SERVER_IP 'pm2 restart all'
                    """
                }
            }
        }
    }
}
