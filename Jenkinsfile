pipeline {
    agent any

    stages {
        stage('Clone Project') {
          steps {
            echo 'Cloning Project 1'
            input('Do you want to continue?')
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
