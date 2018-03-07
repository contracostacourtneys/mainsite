pipeline {
    agent {
        dockerfile true
    }
	
	environment { 
		CI = 'true'
		SECRET_FILE = credentials('secret')
		SECRET = `cat $SECRET_FILE`
		echo "The secret file data is: $SECRET"
	}
	
	stages {
		stage('Build') { 
            steps {
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