pipeline {
    agent any

    stages {
        stage('Clone Project') {
          steps {
            echo 'Cloning Project'
            script {
              def userInput = input(
                id: 'userInput', message: 'Let\'s promote?', parameters: [
                [$class: 'TextParameterDefinition', defaultValue: 'latest', description: 'Environment', name: 'env']
                ])
              echo ("Env: "+userInput)
	      sh "docker build -t srirajpradhann19/javaapp:" + userInput
              sh 'docker images'
            }
          }
        }
        stage('Run App from Kubernet') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
