pipeline {
    agent any

    stages {
        stage('Clone Project') {
          steps {
            echo 'Cloning Project'
            def userInput = input(
                id: 'userInput', message: 'Let\'s promote?', parameters: [
                [$class: 'TextParameterDefinition', defaultValue: 'latest', description: 'Environment', name: 'env']
                ])
            echo ("Env: "+userInput)
            sh 'cd ToDoList'
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
