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
				SECRET = `cat $SECRET_FILE`
				echo "The secret file data is: $SECRET"
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