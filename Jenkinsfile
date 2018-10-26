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
	      sh "docker build -t srirajpradhan19/javaapp:" + userInput + " ."
	      sh "docker login -u=srirajpradhan19 -p=${env.docker}"
	      sh "docker tag srirajpradhan19/javaapp:"+userInput+ " srirajpradhan19/javaapp:latest"
              sh 'docker push srirajpradhan19/javaapp'
	      echo '$HOME/.kube/config'
	      sh 'kubectl run app --image=srirajpradhan19/javaapp:latest --port 8080'
	      sh 'kubectl expose deployment app --type=LoadBalancer'
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
