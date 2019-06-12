module.exports = {
  apps : [{
    name      : 'diego-service',
    script    : 'dist/app.js',
    exec_mode: 'cluster',
    instances: "max",
    env: {
      PORT: 8080,
      name : 'diego-dev',
      NODE_ENV: 'development'
    },
    env_production : {
      PORT: 8081,
      name : 'diego-pro',
      NODE_ENV: 'production'
    }
  }]
}
