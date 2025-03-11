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
                git branch: 'main', url: 'git@github.com:charith0901/Team-portfolio.git'
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
                sshagent(['your-ssh-credential-id']) {
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
