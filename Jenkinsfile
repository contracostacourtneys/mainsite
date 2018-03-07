pipeline {
    agent {
        dockerfile true
    }
	
	environment { 
		CI = 'true'
		SECRET_FILE = credentials('secret')		
	}
	
	stages {
		stage('Build') { 
            steps {
				sh 'SECRET = `cat $SECRET_FILE`'
				sh 'echo "The secret file data is: $SECRET"'
                sh 'npm install' 
            }
        }
        stage('Run') { 
            steps {
                sh 'npm start' 
            }
        }
    }
}