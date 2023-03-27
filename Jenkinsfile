pipeline {
  agent  {
    label 'gateway'
  }

  options {
    timeout(time: 120, unit: 'MINUTES')
  }

  environment {
    IMAGE = '[IMG-NAME]'
    VERSION = readMavenPom().getVersion()
    TAG = '[TAG-NAME]'
    NAME = readMavenPom().getArtifactId()
    PORT = 3000
    APP_ENV = getAppEnvFromBranch(env.BRANCH_NAME)
    ENV_DEV = '[ENV]-dev'
    ENV_REC = '[ENV]-rec'
  }

  tools {
    nodejs '[node-version]'
    maven '[maven-version]'
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

    stage('Units Tests') {
      // Your test cases steps
    }

    stage('SonarQube Scan') {
      // Your sonar scan
    }

    stage('SonarQube Quality Gate') {
      // 
    }
  }

  post {
    changed {
      emailext attachLog: true, body: '$DEFAULT_CONTENT', subject: '$DEFAULT_SUBJECT',  to: '[EMAIL]'
    }
    always {
      sh 'mvn clean'
      cleanWs()
    }
    failure {
      emailext attachLog: true, body: '$DEFAULT_CONTENT', subject: '$DEFAULT_SUBJECT',  to: '[EMAIL]'
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
