
pipeline {
     agent any
     stages {
          stage("Checkout") {
               steps {
                    git url: 'git@github.com:201810-SWEN-200/agenda.git'
               }
          }
          stage("Build") {
               steps {
                    sh "bash ./build_images.sh"
               }
          }
          stage("Test Client") {
               steps {
                    sh "docker-compose -f jenkins-compose.yml run -e CI=jenkins ui yarn test"
               }
          }
          stage("Test Server") {
               steps {
                    sh "cd server && docker run --rm --net my-app-net --link test_api_1:api -e \"API_URL=http://api:3001/question\" agenda_api yarn test"
               }
          }
          stage("Tear Down") {
               steps {
                    sh "docker-compose -f jenkins-compose.yml down"
               }
          }
     }
}
