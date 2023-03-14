pipeline {
  agent  {
    label 'gateway'
  }

  options {
    timeout(time: 120, unit: 'MINUTES')
  }

  environment {
    IMAGE = 'registry.tools.orange-sonatel.com/dif/isc/orange-dev-portal-front'
    VERSION = readMavenPom().getVersion()
    TAG = 'isc-developer-docs'
    NAME = readMavenPom().getArtifactId()
    PORT = 8999
    APP_ENV = getAppEnvFromBranch(env.BRANCH_NAME)
    // ENV_DEV = 'developer-portal-dev'
    ENV_DEV = 'dsideveloperportal-dev'
    ENV_REC = 'dsideveloperportal-rec'
  }

  tools {
    nodejs 'nodejs-16.13.1'
    maven 'Maven_3.3.9'
  }

  stages {
    stage('Clean Package') {
      steps {
        sh 'mvn clean package -Prec'
        stash includes: 'target/*', name: 'target'
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm install -g yarn & yarn'
        stash includes: '**', name: 'app'
      }
    }

    // stage('Units Tests') {
    //   steps {
    //     sh 'yarn test-build'
    //   }
    // }

    // stage('SonarQube Scan') {
    //   steps {
    //     script {
    //       withSonarQubeEnv('SonarQubeServer') {
    //         sh 'yarn sonar'
    //       }
    //     }
    //   }
    // }

    stage(' [REC4] Build Docker image') {
      agent  { label 'docker-builder-rec' }
      environment {
        APP_ENV = getAppEnvFromBranch(env.BRANCH_NAME)
      }
      options { skipDefaultCheckout() }
      steps {
        sh 'docker ps -qa -f name=${NAME} | xargs --no-run-if-empty docker rm -f'
        sh 'docker images -f reference=${IMAGE} -qa | xargs --no-run-if-empty docker rmi'
        sh 'rm -rf target/'
        unstash 'target'
        dir('target') {
          sh 'unzip -o isc-developer-docs-0.0.1-SNAPSHOT.zip'
          sh 'ls -l'
          sh 'docker build --no-cache=true -t ${IMAGE}:${VERSION}.be${BUILD_NUMBER} --build-arg APP_ENV=${APP_ENV} .'
          sh 'docker push ${IMAGE}:${VERSION}.be${BUILD_NUMBER}'
        }
      }
    }

    stage('Malaw DEV - Deploy') {
      when { not { branch 'staging' } }
      agent { label 'malaw4-rec' }
      steps {
        //Generate maven-resource-plugin param files"
        sh 'mvn validate'
        sh 'cat openshift/app-dev.params'
        script {
          openshift.withCluster() {
            openshift.withProject("${ENV_DEV}") {
              //Process spring-boot-image-docker-mysqldb template for app deployment
              def models =  openshift.process('openshift//sonatel-docker-image-volume', '--param-file=openshift/app-dev.params', "-p IMAGE_DOCKER_TAG=${VERSION}.be${BUILD_NUMBER}")

              //Adding labels
              for ( o in models ) {
                o.metadata.labels[ 'env' ] = "${ENV_DEV}"
                o.metadata.labels[ 'type' ] = 'react-app'
                o.metadata.labels[ 'app' ] = 'DEVELOPER_PORTAL_BACK'
                o.metadata.labels[ 'from' ] = 'jenkins-pipeline'
                o.metadata.labels[ 'version' ] = "${VERSION}.be${BUILD_NUMBER}"
              }
              //Create objects processed
              def created = openshift.apply( models )

              //add env
              openshift.raw("set env dc/${NAME} APP_ENV=dev")

              def dc = openshift.selector('dc', "${NAME}")
              dc.rollout().status()
            }
          }
        }
      }
    }

    // stage('SonarQube Quality Gate') {
    //   steps {
    //       script {
    //         sleep(120)
    //         timeout(time: 10, unit: 'MINUTES') {
    //           def qg = waitForQualityGate()
    //           if (qg.status != 'OK') {
    //           error "Pipeline aborted due to quality gate failure: ${qg.status}"
    //           }
    //         }
    //       }
    //   }
    // }
  }

  post {
    changed {
      emailext attachLog: true, body: '$DEFAULT_CONTENT', subject: '$DEFAULT_SUBJECT',  to: 'mohamed.johnson@orange-sonatel.com'
    }
    always {
      sh 'mvn clean'
      cleanWs()
    }
    failure {
      emailext attachLog: true, body: '$DEFAULT_CONTENT', subject: '$DEFAULT_SUBJECT',  to: 'mohamed.johnson@orange-sonatel.com'
    }
  }
}

def static getAppEnvFromBranch(branch) {
  if (branch == 'develop') {
    return 'dev'
  }
  if (branch == 'staging') {
    return 'rec'
  }
  if (branch != 'develop' && branch != 'staging') {
    return 'dev'
  }
}
